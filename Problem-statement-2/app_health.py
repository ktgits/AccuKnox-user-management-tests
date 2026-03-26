import requests
import datetime

LOG_FILE = "app_health.log"

# Add any URLs you want to check
APPS = [
    {"name": "OrangeHRM", "url": "https://opensource-demo.orangehrmlive.com"},
    {"name": "Google",    "url": "https://www.google.com"},
    {"name": "Fake App",  "url": "https://this-website-does-not-exist-xyz.com"},
]

def write_log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] {message}"
    print(log_line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_line + "\n")

def check_app(name, url):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            write_log(f"[UP]   - {name} is running fine | Status: {response.status_code} | URL: {url}")
        else:
            write_log(f"[WARN] - {name} returned unexpected status | Status: {response.status_code} | URL: {url}")
    except requests.exceptions.ConnectionError:
        write_log(f"[DOWN] - {name} is UNREACHABLE | URL: {url}")
    except requests.exceptions.Timeout:
        write_log(f"[DOWN] - {name} TIMED OUT | URL: {url}")
    except Exception as e:
        write_log(f"[ERROR] - {name} | {str(e)} | URL: {url}")

def run():
    write_log("====== Application Health Check Started ======")
    for app in APPS:
        check_app(app["name"], app["url"])
    write_log("====== Application Health Check Completed ======\n")

run()