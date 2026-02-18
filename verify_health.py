import requests
import time

def check_health(url):
    try:
        start_time = time.time()
        response = requests.get(url)
        end_time = time.time()
        latency = (end_time - start_time) * 1000
        
        if response.status_code == 200:
            print(f"Health check passed! Status: {response.status_code}")
            print(f"Latency: {latency:.2f}ms")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"Health check failed! Status: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"Health check failed with error: {e}")
        return False

if __name__ == "__main__":
    # Local backend URL
    local_url = "http://127.0.0.1:8000/health"
    print(f"Testing local backend health check at {local_url}...")
    local_success = check_health(local_url)

    if not local_success:
        print("\nNote: Local backend might not be running. That's okay if we are just testing the code changes.")
    
    prod_url = "https://loan-default-backend-poad.onrender.com/health"
    print(f"\nTesting production backend health check at {prod_url}...")
    check_health(prod_url)
