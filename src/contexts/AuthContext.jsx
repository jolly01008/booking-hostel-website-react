import { createContext, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as jwt from "jsonwebtoken"

import { login } from "../api/auth"
import { getUser } from "../api/setting"

// 定義 context 內容
const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  signin: null,
  logout: null
};

const AuthContext = createContext(defaultAuthContext)
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payload, setPayload] = useState(null)

  // 儲存TOKEN不讓頁面在重新整理時讀不到
  useEffect(() => {
    const token = localStorage.getItem('token');
    if ( token ) {
      const tempPayload = jwt.decode(token)
      setIsAuthenticated(true)
      setPayload(tempPayload)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          country: payload.country
        },
        login: async ( data ) => {
          // 呼叫login function(向後端請求登入的api)抽取到這邊
          const { success, token } = await login({
              email: data.username, 
              password: data.password
            })
          const tempPayload = jwt.decode(token) //取得的token用jwt解析
            if(tempPayload) {
              setPayload(tempPayload);
              setIsAuthenticated(true);
              localStorage.setItem("token", token);
            } else {
              setPayload(null);
              setIsAuthenticated(false);
            }
              return success;
          },
          getUser: async (id) => {
            try{
              const token = localStorage.getItem('token'); //getUser頁面，已是登入驗證身分成功狀態，是可以取得toekn的
              const getUserInfo = await getUser(token, id); // 呼叫getUser function(向後端請求getUser)
              return getUserInfo
            } catch (error) {
              console.error('getUser fail', error)
              return null
            }
            
          }
        }}
    > 
    { children } 
    </AuthContext.Provider>
  )
}
