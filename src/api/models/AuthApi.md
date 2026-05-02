# .AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authControllerActive**](AuthApi.md#authControllerActive) | **POST** /auth/active | Activate user account
[**authControllerForgotPassword**](AuthApi.md#authControllerForgotPassword) | **POST** /auth/forgot-password | Request password reset
[**authControllerGoogleCallback**](AuthApi.md#authControllerGoogleCallback) | **GET** /auth/google/callback | Google OAuth callback
[**authControllerGoogleLogin**](AuthApi.md#authControllerGoogleLogin) | **GET** /auth/google | Google OAuth login
[**authControllerLogin**](AuthApi.md#authControllerLogin) | **POST** /auth/login | User login
[**authControllerRefresh**](AuthApi.md#authControllerRefresh) | **POST** /auth/refresh | Refresh access token
[**authControllerRegister**](AuthApi.md#authControllerRegister) | **POST** /auth/register | User registration
[**authControllerResetPassword**](AuthApi.md#authControllerResetPassword) | **POST** /auth/reset-password | Reset password with token


# **authControllerActive**
> UserResponseDto authControllerActive(activeDto)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiAuthControllerActiveRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiAuthControllerActiveRequest = {
  
  activeDto: {
    token: "abc123verificationtoken",
  },
};

const data = await apiInstance.authControllerActive(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activeDto** | **ActiveDto**|  |


### Return type

**UserResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Account activated successfully |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **authControllerForgotPassword**
> MessageResponseDto authControllerForgotPassword(forgotPasswordDto)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiAuthControllerForgotPasswordRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiAuthControllerForgotPasswordRequest = {
  
  forgotPasswordDto: {
    email: "letutan500@gmail.com",
  },
};

const data = await apiInstance.authControllerForgotPassword(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **forgotPasswordDto** | **ForgotPasswordDto**|  |


### Return type

**MessageResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Password reset email sent if email exists |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **authControllerGoogleCallback**
> TokenResponseDto authControllerGoogleCallback()


### Example


```typescript
import { createConfiguration, AuthApi } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request = {};

const data = await apiInstance.authControllerGoogleCallback(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**TokenResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Google login successful |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **authControllerGoogleLogin**
> void authControllerGoogleLogin()


### Example


```typescript
import { createConfiguration, AuthApi } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request = {};

const data = await apiInstance.authControllerGoogleLogin(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **authControllerLogin**
> TokenResponseDto authControllerLogin(loginDto)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiAuthControllerLoginRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiAuthControllerLoginRequest = {
  
  loginDto: {
    email: "admin@example.com",
    password: "12345678",
  },
};

const data = await apiInstance.authControllerLogin(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **loginDto** | **LoginDto**|  |


### Return type

**TokenResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Login successful |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **authControllerRefresh**
> TokenResponseDto authControllerRefresh()


### Example


```typescript
import { createConfiguration, AuthApi } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request = {};

const data = await apiInstance.authControllerRefresh(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**TokenResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Token refreshed successfully |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **authControllerRegister**
> UserResponseDto authControllerRegister(registerDto)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiAuthControllerRegisterRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiAuthControllerRegisterRequest = {
  
  registerDto: {
    email: "user@example.com",
    password: "P@ssw0rd!",
  },
};

const data = await apiInstance.authControllerRegister(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerDto** | **RegisterDto**|  |


### Return type

**UserResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | User registered successfully |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **authControllerResetPassword**
> MessageResponseDto authControllerResetPassword(resetPasswordDto)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiAuthControllerResetPasswordRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiAuthControllerResetPasswordRequest = {
  
  resetPasswordDto: {
    token: "abc123resettoken",
    newPassword: "P@ssw0rd!",
  },
};

const data = await apiInstance.authControllerResetPassword(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resetPasswordDto** | **ResetPasswordDto**|  |


### Return type

**MessageResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Password reset successfully |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


