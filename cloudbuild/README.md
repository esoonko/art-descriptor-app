# title

docker run -it --rm -v $PWD:/src --entrypoint bash python

### Deploy cloud function
```sh
gcloud builds submit --config ./cloudbuild/cloudfunctions.yaml --substitutions _REGION="europe-west1",_SERVICE="teamcenter-pubsub-entity-bigquery"
```

### Deploy cloud run
```sh
gcloud builds submit --project=roxtec-dev-analytics-2c20 --config ./cloudbuild/cloudrun.yaml \
--substitutions _REGISTRY_URI="europe-west1-docker.pkg.dev/roxtec-dev-analytics-2c20/cloudrun",_REGION="europe-west1",_SERVICE="sugar-api-entity-bigquery",_IMAGE="sugar-api-entity-bigquery",_DOCKERFILE_PATH="./sugar-api-entity-bigquery/",SHORT_SHA=$(echo $RANDOM | md5sum | head -c 7)
```
