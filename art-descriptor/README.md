# art-descriptor-app
Application built on sveltekit that queries LLM with image to get image descriptor and present to users.

# How to run this image locally

+ Make sure you have the correct credentials

  `gcloud auth login --update-adc`

+ Get access_token and set it to env variable and Set PROJECT environment variable. Alternatively fill in the .env.example and rename as .env

  ```
  export ACCESS_TOKEN=$(gcloud auth print-access-token) && \
  export PROJECT=
  ```