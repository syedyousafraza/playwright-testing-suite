# Run the default load profile from the repository root
npm run test:load

# Select another configured profile
k6 run -e TEST_TYPE=stress tests/performance/loadtest.js

# Override the target API
k6 run -e BASE_URL=https://jsonplaceholder.typicode.com tests/performance/loadtest.js

## Reports

k6 always prints its built-in end-of-test summary to the console. This suite also
writes a structured summary to `test-results/k6-summary.json`; that directory is
ignored by git. The summary includes metrics, thresholds, checks, and metadata.

For raw time-series samples, run:

```bash
npm run test:load:json
```

This writes `test-results/k6-results.json`, which is useful for archiving or
post-processing. k6 also supports external real-time outputs such as Prometheus
remote write, InfluxDB, and Grafana Cloud when a persistent dashboard is needed.

Official references:

- https://grafana.com/docs/k6/latest/results-output/end-of-test/
- https://grafana.com/docs/k6/latest/results-output/real-time/
- https://grafana.com/docs/k6/latest/results-output/

The current workload performs one GET and one POST per iteration. For more
representative application modeling, add scenarios with explicit arrival rates,
user flows, and separate thresholds per endpoint rather than increasing load
against the public JSONPlaceholder service.
