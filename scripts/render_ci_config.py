from pathlib import Path


SOURCE = Path("src/_config.yml")
TARGET = Path("src/_config.ci.yml")
NEEDLE = "execute_notebooks: cache"
REPLACEMENT = 'execute_notebooks: "off"'


def main() -> None:
    text = SOURCE.read_text(encoding="utf-8")
    if NEEDLE not in text:
        raise SystemExit(f"Could not find '{NEEDLE}' in {SOURCE}")

    TARGET.write_text(text.replace(NEEDLE, REPLACEMENT, 1), encoding="utf-8")
    print(f"Wrote {TARGET}")


if __name__ == "__main__":
    main()
