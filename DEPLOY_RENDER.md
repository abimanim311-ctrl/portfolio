# Deploying to Render

Steps to enable automatic deploys from this repository to Render:

1. Create a Render service (Web Service) in your Render dashboard and connect it to this GitHub repository.
2. In your GitHub repository settings, add the following secrets:
   - `RENDER_API_KEY` — a Render API key with `deploys:create` scope (create under Account → API Keys).
   - `RENDER_SERVICE_ID` — the Service ID for the target Render service (found in the service's settings URL or API).
3. The included GitHub Actions workflow `.github/workflows/render-deploy.yml` will build the project and trigger a deploy on `push` to `main`.

To manually trigger a deploy via the Render API (local test):

```bash
curl -X POST "https://api.render.com/v1/services/<SERVICE_ID>/deploys" \
  -H "Authorization: Bearer <RENDER_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Replace `<SERVICE_ID>` and `<RENDER_API_KEY>` with your values.
