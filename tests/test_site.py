import datetime
from urllib.parse import unquote

from selenium.webdriver.common.by import By


def click(driver, element):
    # Native clicks race the page's `scroll-behavior: smooth` and can land mid-animation;
    # a JS-dispatched click sidesteps the scroll entirely.
    driver.execute_script("arguments[0].click();", element)


def text_of(element):
    # `.text` reads the rendered box and returns "" while an element's `.reveal` fade-in
    # (opacity 0 until its IntersectionObserver fires) hasn't resolved yet; textContent
    # reflects the DOM content regardless of that animation state.
    return element.get_attribute("textContent").strip()


def test_homepage_loads_in_spanish(spanish_page):
    driver = spanish_page
    assert "Gaspar Pisa Eyaralar" in driver.title
    assert text_of(driver.find_element(By.CSS_SELECTOR, ".hero h1")) == "Gaspar Pisa Eyaralar"
    assert text_of(driver.find_element(By.CLASS_NAME, "hero-role")) == "Ingeniero de software"


def test_homepage_loads_in_english(english_page):
    driver = english_page
    assert text_of(driver.find_element(By.CLASS_NAME, "hero-role")) == "Software Engineer"


def test_language_toggle_switches_and_reverts(spanish_page):
    driver = spanish_page
    toggle = driver.find_element(By.ID, "langToggle")
    assert text_of(toggle) == "EN"

    click(driver, toggle)
    assert text_of(driver.find_element(By.CLASS_NAME, "hero-role")) == "Software Engineer"
    assert text_of(toggle) == "ES"

    click(driver, toggle)
    assert text_of(driver.find_element(By.CLASS_NAME, "hero-role")) == "Ingeniero de software"
    assert text_of(toggle) == "EN"


def test_cv_button_mailto_matches_language(spanish_page):
    driver = spanish_page
    cv_link = driver.find_element(By.CSS_SELECTOR, "#contact .btn-primary")
    href = unquote(cv_link.get_attribute("href"))
    assert href.startswith("mailto:gaspar.pisa@gmail.com?")
    assert "Solicitud de CV" in href

    click(driver, driver.find_element(By.ID, "langToggle"))
    cv_link = driver.find_element(By.CSS_SELECTOR, "#contact .btn-primary")
    href = unquote(cv_link.get_attribute("href"))
    assert "CV Request" in href


def test_project_filter_shows_only_matching_category(driver, base_url):
    driver.get(base_url)
    click(driver, driver.find_element(By.CSS_SELECTOR, '.filter-btn[data-filter="porting"]'))

    cards = driver.find_elements(By.CLASS_NAME, "project-card")
    visible = [c for c in cards if "hidden" not in c.get_attribute("class").split()]
    assert visible
    assert all("porting" in c.get_attribute("data-category").split() for c in visible)

    click(driver, driver.find_element(By.CSS_SELECTOR, '.filter-btn[data-filter="all"]'))
    cards = driver.find_elements(By.CLASS_NAME, "project-card")
    assert all("hidden" not in c.get_attribute("class").split() for c in cards)


def test_testimonial_carousel_next_and_prev(driver, base_url):
    driver.get(base_url)
    cards = driver.find_elements(By.CLASS_NAME, "testimonial-card")
    assert len(cards) >= 2

    def active_index():
        return next(i for i, c in enumerate(cards) if "active" in c.get_attribute("class").split())

    assert active_index() == 0

    click(driver, driver.find_element(By.ID, "testimonialNext"))
    assert active_index() == 1

    click(driver, driver.find_element(By.ID, "testimonialPrev"))
    assert active_index() == 0


def test_footer_year_is_current_year(driver, base_url):
    driver.get(base_url)
    year_text = text_of(driver.find_element(By.ID, "year"))
    assert year_text == str(datetime.datetime.now().year)
