import shutil
import subprocess
import os

def check_python_syntax(filepath):
    try:
        with open(filepath, 'r') as f:
            source = f.read()
        compile(source, filepath, 'exec')
        return True
    except SyntaxError as e:
        print(f"❌ Syntax error in {filepath}: {e}")
        return False

def format_python(filepath):
    if not check_python_syntax(filepath):
        raise Exception("Syntax error — skipping formatting.")
    subprocess.run(["black", filepath], check=True)

def format_c(filepath):
    if not shutil.which("clang-format"):
        raise Exception("clang-format is not installed.")
    subprocess.run(["clang-format", "-i", filepath], check=True)

def format_code(filepath):
    ext = os.path.splitext(filepath)[1]
    if ext == ".py":
        format_python(filepath)
    elif ext == ".c":
        format_c(filepath)
    else:
        raise Exception(f"Unsupported file type: {ext}")
