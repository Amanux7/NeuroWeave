FROM python:3.12-slim

WORKDIR /app

# Install system dependencies for OpenCV and Playwright


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN playwright install --with-deps chromium

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
