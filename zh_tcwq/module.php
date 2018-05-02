<?php

/**

 * 小程序模块定义

 *

 * @author 小程序

 * @url 

 */

defined('IN_IA') or exit('Access Denied');



class Zh_tcwqModule extends WeModule {





	public function welcomeDisplay()

    {   
    	global $_GPC, $_W;

        $url = $this->createWebUrl('index');
        if ($_W['role'] == 'operator') {
        	$url = $this->createWebUrl('account');
        }

        Header("Location: " . $url);

    }

}