# AngelList-Startups

**Date Developed:** 2014-01-03

Using AngelList's API obtain data about NYC startups. Output data as a csv file. Skips hidden startups.

Each company scraped from AngelList is saved in the csv with an id.
Each request to the website could potentially be scraped at 1000 companies per hour using an external cron job or task queuing service with 2 the start and end parameters.

**Angelist API Rate Limit:** 1000 requests per hour. For more see the [AngelList API](https://angel.co/api)

### Parameters:
```python
sys.argv[1] # starting range for URLs to get startup info (start_number)

sys.argv[2] # ending range for URLs (end_number)
```

### Example Command Line Usage:
```python
python AngelListStartups.py 1 1000
```