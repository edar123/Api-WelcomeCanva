
# Welcome Image API

![License](https://img.shields.io/badge/license-MIT-green)

Welcome Image API allows you to generate custom welcome images by specifying various parameters.

## API Endpoint

- **URL:** `/canvas/generate-welcome`
- **Method:** `GET`

## Parameters

### 1. `username` (string)
- **Description:** The username that will appear on the image.
- **Required:** No
- **Default:** `"Usuario"`
- **Example:**

  ```bash
  curl -X GET "http://localhost:3000/canvas/generate-welcome?username=AverageJohnny"
  ```

- **Effect:** Displays "AverageJohnny" as the username in the generated image.

### 2. `avatarUrl` (string)
- **Description:** URL of the avatar image.
- **Required:** No
- **Default:** Default avatar provided by the API.
- **Example:**
  ```bash
  curl -X GET "http://localhost:3000/canvas/generate-welcome?avatarUrl=https://via.placeholder.com/150"
  ```
- **Effect:** Uses the image at the specified URL as the avatar in the generated image.

### 3. `backgroundUrl` (string)
- **Description:** URL of the background image.
- **Required:** No
- **Default:** Default background provided by the API.
- **Example:**
  ```bash
  curl -X GET "http://localhost:3000/canvas/generate-welcome?backgroundUrl=https://via.placeholder.com/1920x1080"
  ```
- **Effect:** Uses the image at the specified URL as the background in the generated image.

### 4. `logoUrl` (string)
- **Description:** URL of the logo image to be displayed in the top right corner.
- **Required:** No
- **Default:** No logo is displayed if not provided.
- **Example:**
  ```bash
  curl -X GET "http://localhost:3000/canvas/generate-welcome?logoUrl=https://via.placeholder.com/200x100"
  ```
- **Effect:** Displays the specified logo image in the top right corner of the generated image.

### 5. `textColor` (string)
- **Description:** Text color in hexadecimal format.
- **Required:** No
- **Default:** `#FFFFFF` (White)
- **Example:**
  ```bash
  curl -X GET "http://localhost:3000/canvas/generate-welcome?textColor=%23FF0000"
  ```
- **Effect:** Sets the text color in the image to the specified color, in this case, red (`#FF0000`).

### 6. `borderColor` (string)
- **Description:** Avatar border color in hexadecimal format.
- **Required:** No
- **Default:** `#FF0000` (Red)
- **Example:**
  ```bash
  curl -X GET "http://localhost:3000/canvas/generate-welcome?borderColor=%2300FF00"
  ```
- **Effect:** Sets the border color around the avatar to the specified color, in this case, green (`#00FF00`).

### 7. `customText` (string)
- **Description:** Custom text that will appear on the image.
- **Required:** No
- **Default:** `"Gracias por estar con nosotros"`
- **Example:**
  ```bash
  curl -X GET "http://localhost:3000/canvas/generate-welcome?customText=Welcome%20to%20the%20community!"
  ```
- **Effect:** Displays the custom text provided in the generated image.

## Example Request with All Parameters

```bash
curl -X GET "http://localhost:3000/canvas/generate-welcome?username=AverageJohnny&avatarUrl=https://via.placeholder.com/150&backgroundUrl=https://via.placeholder.com/1920x1080&logoUrl=https://via.placeholder.com/200x100&textColor=%23FFFFFF&borderColor=%2300FF00&customText=Welcome%20to%20the%20community!"
```

## Response

The API returns a PNG image generated according to the provided parameters.

## Contributions

Contributions are welcome. If you find a bug or have a suggestion, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
