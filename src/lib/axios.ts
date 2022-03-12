import axios, {AxiosResponseTransformer, AxiosRequestTransformer} from "axios";
import isObject from "lodash/isObject";
import snakeCase from "lodash/snakeCase";
import camelCase from "lodash/camelCase";
import qs from "qs";

const deepMapKeys = (obj: any, cb: any): any => {
  // base case (再帰ストップ)
  if (!isObject(obj) || obj instanceof File) {
    return obj;
  }

  if (Array.isArray(obj)) {
    // 配列ならキーの変換はなし
    return obj.map((val) => {
      // 再帰
      return deepMapKeys(val, cb);
    });
  }

  // オブジェクトならキーを変換
  // objectを[key, value]の配列に変換
  const entries = Object.entries(obj);
  // keyをcbに通し、valueを再帰的に処理
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const childEntries = entries.map(([key, value]) => [
    cb(value, key),
    deepMapKeys(value, cb),
  ]);

  // Object.formEntriesでobjectに戻す
  return Object.fromEntries(childEntries);
};

let defaultTransformResponse: AxiosResponseTransformer[] = [];
if (axios.defaults.transformResponse) {
  if (!!axios.defaults.transformResponse.length) {
    defaultTransformResponse = defaultTransformResponse.concat(
      axios.defaults.transformResponse
    );
  } else {
    defaultTransformResponse.push(
      axios.defaults.transformResponse as AxiosResponseTransformer
    );
  }
}

let defaultTransformRequest: AxiosRequestTransformer[] = [];
if (axios.defaults.transformRequest) {
  if (!!axios.defaults.transformRequest.length) {
    defaultTransformRequest = defaultTransformRequest.concat(
      axios.defaults.transformRequest
    );
  } else {
    defaultTransformRequest.push(
      axios.defaults.transformRequest as AxiosRequestTransformer
    );
  }
}

export default axios.create({
  transformRequest: [
    function (data, headers) {
      if (data instanceof FormData) {
        return data;
      }
      return deepMapKeys(data, (_: any, key: string) => {
        return snakeCase(key);
      });
    },
    ...defaultTransformRequest,
  ],

  transformResponse: [
    ...defaultTransformResponse,
    function (data, headers) {
      if (
        headers &&
        (!headers["content-type"] ||
          headers["content-type"].indexOf("application/json") === -1)
      ) {
        return data;
      }
      return deepMapKeys(data, (val: string, key: string) => {
        return camelCase(key);
      });
    },
  ],

  paramsSerializer: function (params) {
    return qs.stringify(
      deepMapKeys(params, (_: any, key: string) => {
        return snakeCase(key);
      })
    );
  },
});
