# .RolesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**rolesControllerAssignPermissions**](RolesApi.md#rolesControllerAssignPermissions) | **PUT** /roles/{id}/permissions | Assign permissions to role
[**rolesControllerCreateRole**](RolesApi.md#rolesControllerCreateRole) | **POST** /roles | Create a new role
[**rolesControllerFindAll**](RolesApi.md#rolesControllerFindAll) | **GET** /roles | List roles (paginated)
[**rolesControllerFindOne**](RolesApi.md#rolesControllerFindOne) | **GET** /roles/{id} | Get role by id
[**rolesControllerRemove**](RolesApi.md#rolesControllerRemove) | **DELETE** /roles/{id} | Delete role (not applicable to ADMIN)
[**rolesControllerUpdate**](RolesApi.md#rolesControllerUpdate) | **PATCH** /roles/{id} | Update role


# **rolesControllerAssignPermissions**
> RoleResponseDto rolesControllerAssignPermissions(assignPermissionsDto)


### Example


```typescript
import { createConfiguration, RolesApi } from '';
import type { RolesApiRolesControllerAssignPermissionsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RolesApi(configuration);

const request: RolesApiRolesControllerAssignPermissionsRequest = {
  
  id: "uuid-v4",
  
  assignPermissionsDto: {
    permissionIds: ["9d1c9c9e-8b7e-4f12-9f8b-123456789abc","2c7e3d1a-1234-4b6c-9a11-abcdefabcdef"],
  },
};

const data = await apiInstance.rolesControllerAssignPermissions(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **assignPermissionsDto** | **AssignPermissionsDto**|  |
 **id** | [**string**] |  | defaults to undefined


### Return type

**RoleResponseDto**

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

# **rolesControllerCreateRole**
> RoleResponseDto rolesControllerCreateRole(createRoleDto)


### Example


```typescript
import { createConfiguration, RolesApi } from '';
import type { RolesApiRolesControllerCreateRoleRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RolesApi(configuration);

const request: RolesApiRolesControllerCreateRoleRequest = {
  
  createRoleDto: {
    name: "admin",
    description: "Administrator role with full access",
    permissions: ["123e4567-e89b-12d3-a456-426614174000","123e4567-e89b-12d3-a456-426614174001"],
  },
};

const data = await apiInstance.rolesControllerCreateRole(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createRoleDto** | **CreateRoleDto**|  |


### Return type

**RoleResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Role created successfully |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **rolesControllerFindAll**
> Array<RoleResponseDto> rolesControllerFindAll()


### Example


```typescript
import { createConfiguration, RolesApi } from '';
import type { RolesApiRolesControllerFindAllRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RolesApi(configuration);

const request: RolesApiRolesControllerFindAllRequest = {
  
  page: 1,
  
  limit: 20,
};

const data = await apiInstance.rolesControllerFindAll(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | [**number**] |  | (optional) defaults to 1
 **limit** | [**number**] |  | (optional) defaults to 20


### Return type

**Array<RoleResponseDto>**

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

# **rolesControllerFindOne**
> RoleResponseDto rolesControllerFindOne()


### Example


```typescript
import { createConfiguration, RolesApi } from '';
import type { RolesApiRolesControllerFindOneRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RolesApi(configuration);

const request: RolesApiRolesControllerFindOneRequest = {
  
  id: "uuid-v4",
};

const data = await apiInstance.rolesControllerFindOne(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**RoleResponseDto**

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

# **rolesControllerRemove**
> any rolesControllerRemove()


### Example


```typescript
import { createConfiguration, RolesApi } from '';
import type { RolesApiRolesControllerRemoveRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RolesApi(configuration);

const request: RolesApiRolesControllerRemoveRequest = {
  
  id: "uuid-v4",
};

const data = await apiInstance.rolesControllerRemove(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**any**

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

# **rolesControllerUpdate**
> RoleResponseDto rolesControllerUpdate(updateRoleDto)


### Example


```typescript
import { createConfiguration, RolesApi } from '';
import type { RolesApiRolesControllerUpdateRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RolesApi(configuration);

const request: RolesApiRolesControllerUpdateRequest = {
  
  id: "uuid-v4",
  
  updateRoleDto: {
    name: "editor",
    description: "Editor role",
  },
};

const data = await apiInstance.rolesControllerUpdate(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateRoleDto** | **UpdateRoleDto**|  |
 **id** | [**string**] |  | defaults to undefined


### Return type

**RoleResponseDto**

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


