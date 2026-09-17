# Selenium tests

End-to-end tests against the static site using a real (headless) Chrome browser.

## Run locally

```bash
python3 -m venv .venv
.venv/bin/pip install -r tests/requirements.txt

python3 -m http.server 8000 &

BASE_URL=http://localhost:8000 .venv/bin/pytest tests/ -v
```

Requires Chrome/Chromium and a matching `chromedriver` on `PATH` (Selenium
Manager will try to download one automatically if none is found).
