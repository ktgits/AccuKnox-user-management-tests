import psutil
import datetime

# Thresholds
CPU_THRESHOLD    = 80
MEMORY_THRESHOLD = 80
DISK_THRESHOLD   = 80

LOG_FILE = "health_report.log"

def write_log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] {message}"
    print(log_line)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_line + "\n")

def check_cpu():
    cpu = psutil.cpu_percent(interval=1)
    if cpu > CPU_THRESHOLD:
        write_log(f"[ALERT] CPU usage is HIGH: {cpu}%")
    else:
        write_log(f"[OK] CPU usage is OK: {cpu}%")

def check_memory():
    mem = psutil.virtual_memory()
    used_percent = mem.percent
    if used_percent > MEMORY_THRESHOLD:
        write_log(f"[ALERT] Memory usage is HIGH: {used_percent}%")
    else:
        write_log(f"[OK] Memory usage is OK: {used_percent}%")

def check_disk():
    disk = psutil.disk_usage('/')
    used_percent = disk.percent
    if used_percent > DISK_THRESHOLD:
        write_log(f"[ALERT] Disk usage is HIGH: {used_percent}%")
    else:
        write_log(f"[OK] Disk usage is OK: {used_percent}%")

def check_processes():
    process_count = len(psutil.pids())
    write_log(f"[INFO] Total running processes: {process_count}")

def run():
    write_log("====== System Health Check Started ======")
    check_cpu()
    check_memory()
    check_disk()
    check_processes()
    write_log("====== System Health Check Completed ======\n")

run()