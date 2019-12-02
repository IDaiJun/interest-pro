package com.interest.common.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

@Slf4j
public class SecurityAuthenUtil {

	public static SecurityContext getSecurityContext(){
		return SecurityContextHolder.getContext();
	}

	public static Authentication getAuthentication(){
		return getSecurityContext().getAuthentication();
	}

	/**
	 * 获取当前用户的认证用户信息
	 * @return
	 */
	public static User getUser(){
		return (User)getAuthentication().getPrincipal();
	}

	/**
	 * 获取当前用户的登录账号Username
	 * @return
	 */
	public static String getLoginName() {
		return getUser().getUsername();
	}

	/**
	 * 获取当前用户的登录账号id
	 * @return
	 */
	public static int getId() {
		return Integer.valueOf(getLoginName());
	}

	/**
	 * 获取当前用户的登录账号id，不抛出异常
	 * @return
	 */
	public static int getIdWithoutException() {
		try {
			return getId();
		}catch (Exception ex){
			log.error("get user id error: {}", ex);
			return 0;
		}
	}

}
