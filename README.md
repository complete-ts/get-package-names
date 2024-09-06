# `get-package-names`

## Introduction

`get-package-names` is a [GitHub Action](https://docs.github.com/en/actions) that gets all of the package names in a monorepo. You can also optionally get all of the package names that contain a certain "package.json" script (such as "test").

The point of this is that you can use the package names to dynamically generate GitHub actions jobs for each package. This kind of thing is great, because you no longer need to manually update your CI files whenever you add a new package to the monorepo.

## Usage

Here's an example of a GitHub Actions file for a monorepo that uses automatically run the `build`, `lint`, and `test` scripts:

```yml
name: CI

on: [push, pull_request]

jobs:
  get-build-packages:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.package-names }}
    steps:
      - uses: actions/checkout@v4
      - id: set-matrix
        uses: complete-ts/get-package-names@main
        with:
          script-name: build

  build:
    needs: get-build-packages
    runs-on: ubuntu-latest
    strategy:
      matrix:
        package-name: ${{ fromJson(needs.get-build-packages.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/workflows/setup
      - working-directory: ./packages/${{ matrix.package-name }}
        run: npm run build

  get-lint-packages:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.package-names }}
    steps:
      - uses: actions/checkout@v4
      - id: set-matrix
        uses: complete-ts/get-package-names@main
        with:
          script-name: lint

  lint:
    needs: get-lint-packages
    runs-on: ubuntu-latest
    strategy:
      matrix:
        package-name: ${{ fromJson(needs.get-lint-packages.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/workflows/setup
      - working-directory: ./packages/${{ matrix.package-name }}
        run: npm run lint

  get-test-packages:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.package-names }}
    steps:
      - uses: actions/checkout@v4
      - id: set-matrix
        uses: complete-ts/get-package-names@main
        with:
          script-name: test

  test:
    needs: get-test-packages
    runs-on: ubuntu-latest
    strategy:
      matrix:
        package-name: ${{ fromJson(needs.get-test-packages.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4
      - uses: ./.github/workflows/setup
      - working-directory: ./packages/${{ matrix.package-name }}
        run: npm run test
```

## Inputs

| Key         | Required | Type   | Default | Description                                                                                                                               |
| ----------- | -------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| script-name | No       | String | ""      | The name of a "package.json" script. If specified, only monorepo packages that contain a script with the specified name will be returned. |

## Outputs

| Key           | Type   | Description                                                                                                    |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| package-names | string | The names of the directories that were found in the monorepo "packages" directory. For example: ["foo", "bar"] |
