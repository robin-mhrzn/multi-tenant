import { APIService } from "@app/helpers/apiHelper/apiHelper";
import { showMessage } from "@app/helpers/common/commonHelper";
import { storeAuthToken, storeUserData } from "@app/store/slices/profile.slice";

export class UserService {
  private readonly apiService: APIService;
  constructor() {
    this.apiService = new APIService();
  }
  register = ({
    data,
    successCallback,
  }: {
    data: any;
    successCallback: (res: any) => void;
  }) => {
    this.apiService
      .callApi({
        url: "auth/register",
        method: "post",
        data: data,
      })
      .then((res?: any) => {
        showMessage(res.data.success, res.data.message);
        if (res?.status === 200 && res.data.success == true) {
          successCallback(res.data);
        }
      });
  };
  login = ({
    data,
    successCallback,
  }: {
    data: any;
    successCallback: (res: any) => void;
  }) => {
    return (dispatch?: any) => {
      this.apiService
        .callApi({
          url: "auth/login",
          method: "post",
          data: data,
        })
        .then((res?: any) => {
          if (res?.status === 200 && res.data.success == true) {
            showMessage(res.data.success, res.data.message);
            dispatch(storeUserData(res?.data?.data));
            dispatch(storeAuthToken(res?.data?.data?.access_token));
            this.apiService.updateAuthToken(res?.data?.data?.access_token);
            successCallback(res.data);
          } else if (res?.data?.success == false) {
            showMessage(false, res.data.message);
          }
        });
    };
  };

  changePassword = ({
    data,
    successCallback,
  }: {
    data: any;
    successCallback: (res: any) => void;
  }) => {
    this.apiService
      .callApi({
        url: "user/changePassword",
        method: "post",
        data: data,
      })
      .then((res?: any) => {
        if (res?.status === 200 && res.data.success == true) {
          showMessage(res.data.success, res.data.message);
          successCallback(res.data);
        } else if (res?.data.success == false) {
          showMessage(res.data.success, res.data.message);
        }
      });
  };

  saveProfile = ({
    data,
    successCallback,
  }: {
    data: any;
    successCallback: (res: any) => void;
  }) => {
    this.apiService
      .callApi({
        url: "user/saveProfile",
        method: "post",
        data: data,
      })
      .then((res?: any) => {
        if (res?.status === 200 && res.data.success == true) {
          showMessage(res.data.success, res.data.message);
          successCallback(res.data);
        } else if (res?.data.success == false) {
          showMessage(res.data.success, res.data.message);
        }
      });
  };
}
