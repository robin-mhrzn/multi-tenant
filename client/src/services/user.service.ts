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
    callback,
  }: {
    data: any;
    callback: (res: any) => void;
  }) => {
    this.apiService
      .callApi({
        url: "auth/register",
        method: "post",
        data: data,
      })
      .then((res?: any) => {
        if (res?.status === 200 && res.data.success == true) {
          showMessage(res.data.success, res.data.message);
        }
        callback(res.data);
      });
  };
  login = ({ data, callback }: { data: any; callback: (res: any) => void }) => {
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
          }
          callback(res.data);
        });
    };
  };
  generateResetCode = ({
    data,
    callback,
  }: {
    data: any;
    callback: (res: any) => void;
  }) => {
    this.apiService
      .callApi({
        url: "auth/generateResetCode",
        method: "post",
        data: data,
      })
      .then((res?: any) => {
        if (res?.status === 200 && res.data.success == true) {
          showMessage(true, res.data.message);
        }
        callback(res.data);
      });
  };
  validateResetCode = ({
    data,
    callback,
  }: {
    data: any;
    callback: (res: any) => void;
  }) => {
    this.apiService
      .callApi({
        url: "auth/validateResetCode",
        method: "post",
        data: data,
      })
      .then((res?: any) => {
        callback(res.data);
      });
  };

  resetPassword = ({
    data,
    callback,
  }: {
    data: any;
    callback: (res: any) => void;
  }) => {
    this.apiService
      .callApi({
        url: "auth/resetPassword",
        method: "post",
        data: data,
      })
      .then((res?: any) => {
        if (res?.status === 200 && res.data.success == true) {
          showMessage(true, res.data.message);
        }
        callback(res.data);
      });
  };

  changePassword = ({
    data,
    callback,
  }: {
    data: any;
    callback: (res: any) => void;
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
        }
        callback(res.data);
      });
  };

  saveProfile = ({
    data,
    callback,
  }: {
    data: any;
    callback: (res: any) => void;
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
        }
        callback(res.data);
      });
  };
}
