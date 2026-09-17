import os

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8000")


@pytest.fixture
def base_url():
    return BASE_URL


@pytest.fixture
def driver():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1400,1000")
    drv = webdriver.Chrome(options=options)
    yield drv
    drv.quit()


def _load_in_language(driver, base_url, lang):
    # The site picks its language from navigator.language on first visit, so tests
    # that care about a specific language pin it via localStorage before reloading.
    driver.get(base_url)
    driver.execute_script(f"localStorage.setItem('lang', '{lang}');")
    driver.get(base_url)
    return driver


@pytest.fixture
def spanish_page(driver, base_url):
    return _load_in_language(driver, base_url, "es")


@pytest.fixture
def english_page(driver, base_url):
    return _load_in_language(driver, base_url, "en")
