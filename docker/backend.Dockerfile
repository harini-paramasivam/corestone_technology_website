# CoreStone Technologies — Backend production image

FROM python:3.12-slim AS production

# Oracle's python-oracledb driver needs libaio on some platforms for the
# thick-mode client; the thin mode (default, no Oracle Client install
# required) works without it, but libaio1 is small and cheap insurance.


WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# Non-root user — never run the app as root in production.
RUN useradd --create-home --shell /bin/bash corestone \
    && chown -R corestone:corestone /app
USER corestone

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/api/v1/health')" || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
