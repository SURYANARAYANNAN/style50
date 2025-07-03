#!/usr/bin/env python3

import sys
from formatter import format_code
import subprocess

def main():
    if len(sys.argv) != 2:
        print("Usage: style50 <file.py>")
        sys.exit(1)

    filepath = sys.argv[1]

    try:
        format_code(filepath)
        print(f"✅ Formatted: {filepath}")
    except subprocess.CalledProcessError:
        print(f"❌ Formatting failed. Is it a valid file?")
    except Exception as e:
        print(f"⚠️  {e}")

if __name__ == "__main__":
    main()
