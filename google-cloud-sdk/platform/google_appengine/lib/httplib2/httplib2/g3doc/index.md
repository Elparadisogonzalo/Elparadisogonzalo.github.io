# What's httplib2?

go/httplib2

httplib2 is a comprehensive HTTP client library that supports many features left
out of other HTTP libraries.

## How do I use it?

See http://httplib2.readthedocs.io/.

## Updating httplib2

*   Create a new CL and replace the CL number.
*   Replace the hash with the release or the latest of the commit id from
    https://github.com/httplib2/httplib2/tree/master/.

```shell
$ /google/data/ro/teams/copybara/copybara \
    copy.bara.sky \
    from_github_to_piper \
    23a7e13fe24ee33855263dd947484b14dcb169fa \
    --destination-cl=239386605 \
    --piper-description-behavior OVERWRITE
```
