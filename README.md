# Simple Account Origination Sample Implementation

This repository contains a simple implementation of the experimental [Simple Account Origination standards](https://consumerdatastandardsaustralia.github.io/standards-experimental/Standards/Simple-Bank-Account-Origination.html).

The Simple Account Origination standards have been created to trial approaches for bank account origination in the context of a Consumer Data Right (CDR) data holder implementation.

The purpose of this repository is to provide a simple static implementation of these standards that can be used by a test client to trial the standards and see how effective they are.

This service will be hosted by the Data Standards Body for the duration of the experimental testing of the standards.

## Contributing To The Repository

Contributions are welcome to this repository.  Please create separate branches and raise a PR against the master branch if you have a proposed change.

Contribution is specifically requested by the parties involved in the Simple Account Origination experiment being conducted by the DSB.

## Using The Repository

Pre-requisites to run this repository are:
1. The repository must be cloned
1. node 18 and npm must be installed

To build and run the repository:

`npm install` - to install npm packages
`npm run build` - to do a full build
`npm run dev` - to run locally at http://localhost:3000

## Postman Collection

In the `postman` folder are a collection JSON file and two environment JSON files.  This can be imported into Postman and used to test the service.  The `aws` environment contains the details for accessing the AWS hosted implementation managed by the DSB and the `dev` environment contains the details for accessing a locally running instance.

## Modifying Data

The sample static data being served can be found in the `src/data` folder.  This folder contains a separate folder for each sample bank.  Each of these folders contains two sample JSON files:

* products.json - containing PRD compliant product data with the origination extensions included
* schemes.json - containing the origination schemes data used in the extension schemes endpoint

These data files can be extended and submitted for inclusion via a PR