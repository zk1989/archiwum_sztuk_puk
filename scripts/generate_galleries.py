#!/usr/bin/env python3
"""
Scan the photos/ folder and sync data/venues.json + data/<venue>.json.

Folder convention expected under photos/:

    photos/<venue>/<year>/<event>/<image files>

For every event folder found, this script makes sure there is a matching
entry in data/<venue>.json with id/year/thumbnail/photos filled in.
"month" and "title" are left empty ("") for new entries so they can be
filled in by hand afterwards. Existing entries are matched by their photo
folder, so hand-edited "month"/"title"/"thumbnail" values are never
touched or reordered - the script only adds what's missing.

Usage:
    python scripts/generate_galleries.py           # scan and update files
    python scripts/generate_galleries.py --dry-run  # just print what would change
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PHOTOS_DIR = ROOT / "photos"
DATA_DIR = ROOT / "data"
VENUES_JSON = DATA_DIR / "venues.json"

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}


def natural_key(s):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", s)]


def to_posix(path):
    return path.as_posix()


def load_json(path, default):
    if not path.exists():
        return default
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def dump_string(s):
    return json.dumps(s, ensure_ascii=False)


def format_venue(v):
    return (
        "  {\n"
        '    "id":          %s,\n'
        '    "name":        %s,\n'
        '    "city":        %s\n'
        "  }" % (dump_string(v["id"]), dump_string(v["name"]), dump_string(v["city"]))
    )


def write_venues(venues):
    body = ",\n".join(format_venue(v) for v in venues)
    VENUES_JSON.write_text("[\n" + body + "\n]\n", encoding="utf-8")


def format_event(e):
    photos_lines = ",\n".join(
        '      { "file": %s }' % dump_string(p["file"]) for p in e["photos"]
    )
    return (
        "  {\n"
        '    "id":          %s,\n'
        '    "year":        %d,\n'
        '    "month":       %s,\n'
        '    "title":       %s,\n'
        '    "thumbnail":   %s,\n'
        '    "photos": [\n'
        "%s\n"
        "    ]\n"
        "  }"
        % (
            dump_string(e["id"]),
            e["year"],
            dump_string(e.get("month", "")),
            dump_string(e.get("title", "")),
            dump_string(e["thumbnail"]),
            photos_lines,
        )
    )


def write_events(path, events):
    body = ",\n".join(format_event(e) for e in events)
    path.write_text("[\n" + body + "\n]\n", encoding="utf-8")


def event_folder_key(event):
    if not event.get("photos"):
        return None
    first_file = event["photos"][0]["file"]
    return str(Path(first_file).parent.as_posix())


def list_images(folder):
    files = [
        p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS
    ]
    files.sort(key=lambda p: natural_key(p.name))
    return files


def main():
    dry_run = "--dry-run" in sys.argv

    if not PHOTOS_DIR.is_dir():
        print(f"No photos/ folder found at {PHOTOS_DIR}")
        return

    venues = load_json(VENUES_JSON, [])
    venues_by_id = {v["id"]: v for v in venues}
    venues_changed = False

    changes = []

    venue_dirs = sorted(
        [p for p in PHOTOS_DIR.iterdir() if p.is_dir()], key=lambda p: natural_key(p.name)
    )

    for venue_dir in venue_dirs:
        venue_id = venue_dir.name

        if venue_id not in venues_by_id:
            stub = {
                "id": venue_id,
                "name": venue_id.replace("-", " ").title(),
                "city": "",
            }
            venues.append(stub)
            venues_by_id[venue_id] = stub
            venues_changed = True
            changes.append(f'venues.json: added new venue "{venue_id}" (fill in name/city)')

        events_path = DATA_DIR / f"{venue_id}.json"
        events = load_json(events_path, [])
        events_changed = False

        existing_by_folder = {}
        for e in events:
            key = event_folder_key(e)
            if key:
                existing_by_folder[key] = e

        year_dirs = sorted(
            [p for p in venue_dir.iterdir() if p.is_dir() and p.name.isdigit()],
            key=lambda p: natural_key(p.name),
        )

        for year_dir in year_dirs:
            year = int(year_dir.name)
            event_dirs = sorted(
                [p for p in year_dir.iterdir() if p.is_dir()],
                key=lambda p: natural_key(p.name),
            )

            for event_dir in event_dirs:
                images = list_images(event_dir)
                if not images:
                    continue

                folder_key = to_posix(event_dir.relative_to(ROOT))
                file_paths = [to_posix(p.relative_to(ROOT)) for p in images]

                existing = existing_by_folder.get(folder_key)

                if existing is None:
                    event_id = f"{venue_id}-{year}-{event_dir.name}"
                    new_event = {
                        "id": event_id,
                        "year": year,
                        "month": "",
                        "title": "",
                        "thumbnail": file_paths[0],
                        "photos": [{"file": f} for f in file_paths],
                    }
                    events.append(new_event)
                    events_changed = True
                    changes.append(
                        f'{venue_id}.json: added new event "{event_id}" ({len(file_paths)} photos)'
                    )
                else:
                    known_files = {p["file"] for p in existing["photos"]}
                    missing = [f for f in file_paths if f not in known_files]
                    if missing:
                        existing["photos"].extend({"file": f} for f in missing)
                        events_changed = True
                        changes.append(
                            f'{venue_id}.json: added {len(missing)} new photo(s) to '
                            f'"{existing["id"]}"'
                        )

        if events_changed and not dry_run:
            write_events(events_path, events)

    if venues_changed and not dry_run:
        write_venues(venues)

    if not changes:
        print("Nothing to do — data files already match the photos/ folder.")
        return

    print(("Would make" if dry_run else "Made") + " the following changes:")
    for c in changes:
        print(f"  - {c}")


if __name__ == "__main__":
    main()
