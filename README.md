# Open Data Validator

Open Data Validator is a open source, single-page web application designed to help validate and refine the labels of an existing dataset through human input, effectively removing misclassifications.

## Purpose

The main objective of this project is to provide a simple and efficient way to validate the labels of an existing dataset. It's particularly useful for machine learning projects where the accuracy of data labels is crucial. By leveraging human input, this tool helps to:

1. Identify and correct mislabeled data
2. Improve the overall quality of your dataset
3. Enhance the performance of machine learning models trained on this data

## How It Works

1. The application reads images from subdirectories within a `public/dataset/` folder. Each subdirectory represents a label.
2. Users are presented with a random image from the dataset along with its current classification.
3. Users can either confirm the current classification or indicate that it's incorrect.
4. If the classification is incorrect, users can select the correct label from a list of available options (the labels are the names of the subdirectories of the dataset dir).
5. Validated images are moved to a `validated/` directory, maintaining the same subdirectory structure for labels.
6. This process continues until all images in the dataset have been validated.

## Features

- Display random images from a dataset for validation
- Allow users to confirm or reject current classifications
- Provide an interface for correcting misclassified images
- Move validated images to a separate directory
- Responsive design for various screen sizes

## Prerequisites

- Node.js 14.x or later
- npm 6.x or later

## Installation

1. Clone the repository:
https://github.com/giacomoarienti/open-data-validator

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

## Docker

1. Build the Docker image:
```bash
docker build . -t odv
```

2. Run the Docker container:
```bash
docker run -d -p 8001:3000 \
  -v ./dataset/:/app/public/dataset \
  -v ./validated/:/app/validated/ \
  --name odv odv
```