# .PermissionsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**permissionsControllerCreate**](PermissionsApi.md#permissionsControllerCreate) | **POST** /permissions | Create a new permission
[**permissionsControllerFindAll**](PermissionsApi.md#permissionsControllerFindAll) | **GET** /permissions | List permissions (paginated)
[**permissionsControllerFindOne**](PermissionsApi.md#permissionsControllerFindOne) | **GET** /permissions/{id} | Get permission by id
[**permissionsControllerGetMeta**](PermissionsApi.md#permissionsControllerGetMeta) | **GET** /permissions/meta | Get permission metadata for frontend
[**permissionsControllerRemove**](PermissionsApi.md#permissionsControllerRemove) | **DELETE** /permissions/{id} | Delete permission
[**permissionsControllerUpdate**](PermissionsApi.md#permissionsControllerUpdate) | **PUT** /permissions/{id} | Update permission


# **permissionsControllerCreate**
> Permission permissionsControllerCreate(createPermissionDto)


### Example


```typescript
import { createConfiguration, PermissionsApi } from '';
import type { PermissionsApiPermissionsControllerCreateRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PermissionsApi(configuration);

const request: PermissionsApiPermissionsControllerCreateRequest = {
  
  createPermissionDto: {
    module: "user",
    action: "read",
    description: "Xem danh sách người dùng",
    isSystem: false,
  },
};

const data = await apiInstance.permissionsControllerCreate(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createPermissionDto** | **CreatePermissionDto**|  |


### Return type

**Permission**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **permissionsControllerFindAll**
> Array<Permission> permissionsControllerFindAll()


### Example


```typescript
import { createConfiguration, PermissionsApi } from '';
import type { PermissionsApiPermissionsControllerFindAllRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PermissionsApi(configuration);

const request: PermissionsApiPermissionsControllerFindAllRequest = {
  
  page: 1,
  
  limit: 20,
};

const data = await apiInstance.permissionsControllerFindAll(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | [**number**] |  | (optional) defaults to 1
 **limit** | [**number**] |  | (optional) defaults to 20


### Return type

**Array<Permission>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **permissionsControllerFindOne**
> Permission permissionsControllerFindOne()


### Example


```typescript
import { createConfiguration, PermissionsApi } from '';
import type { PermissionsApiPermissionsControllerFindOneRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PermissionsApi(configuration);

const request: PermissionsApiPermissionsControllerFindOneRequest = {
  
  id: "uuid-v4",
};

const data = await apiInstance.permissionsControllerFindOne(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**Permission**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **permissionsControllerGetMeta**
> PermissionMetaResponseDto permissionsControllerGetMeta()

Used to render UI (module, system action, custom action). Not for auth.

### Example


```typescript
import { createConfiguration, PermissionsApi } from '';

const configuration = createConfiguration();
const apiInstance = new PermissionsApi(configuration);

const request = {};

const data = await apiInstance.permissionsControllerGetMeta(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**PermissionMetaResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **permissionsControllerRemove**
> void permissionsControllerRemove()


### Example


```typescript
import { createConfiguration, PermissionsApi } from '';
import type { PermissionsApiPermissionsControllerRemoveRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PermissionsApi(configuration);

const request: PermissionsApiPermissionsControllerRemoveRequest = {
  
  id: "uuid-v4",
};

const data = await apiInstance.permissionsControllerRemove(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


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
**200** | Permission deleted |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **permissionsControllerUpdate**
> Permission permissionsControllerUpdate(updatePermissionDto)


### Example


```typescript
import { createConfiguration, PermissionsApi } from '';
import type { PermissionsApiPermissionsControllerUpdateRequest } from '';

const configuration = createConfiguration();
const apiInstance = new PermissionsApi(configuration);

const request: PermissionsApiPermissionsControllerUpdateRequest = {
  
  id: "uuid-v4",
  
  updatePermissionDto: {
    description: "Xem & tìm kiếm người dùng",
  },
};

const data = await apiInstance.permissionsControllerUpdate(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updatePermissionDto** | **UpdatePermissionDto**|  |
 **id** | [**string**] |  | defaults to undefined


### Return type

**Permission**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


