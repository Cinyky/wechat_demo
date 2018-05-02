<?php
global $_GPC, $_W;
$GLOBALS['frames'] = $this->getMainMenu();
$storeid=$_COOKIE["storeid"];
$gtime=date("Y-m-d");
$pageindex = max(1, intval($_GPC['page']));
$pagesize=30;
if(!empty($_GPC['time'])){

$gtime=$_GPC['time'];

}
$sql=" select  a.money as xsmoney,time from (select  id,money,FROM_UNIXTIME(time) as time  from".tablename('zhtc_order')." where uniacid={$_W['uniacid']} and state in (2,3,4,5,7)) a  where time like '%{$gtime}%' union all select money as xsmoney,time from".tablename('zhtc_storepaylog')." where uniacid={$_W['uniacid']} and money>0 and  time like '%{$gtime}%' union all select money as xsmoney,time from".tablename('zhtc_tzpaylog')." where uniacid={$_W['uniacid']} and money>0 and  time like '%{$gtime}%' union all select money as xsmoney,time from".tablename('zhtc_carpaylog')." where uniacid={$_W['uniacid']} and money>0 and  time like '%{$gtime}%' union all select money  as xsmoney,time from".tablename('zhtc_yellowpaylog')." where uniacid={$_W['uniacid']} and money>0 and  time like '%{$gtime}%'";


$total=pdo_fetchcolumn("SELECT count(*) from (select  a.money as xsmoney,time from (select  id,money,FROM_UNIXTIME(time) as time  from".tablename('zhtc_order')." where uniacid={$_W['uniacid']} and state in (2,3,4,5,7)) a  where time like '%{$gtime}%' union all select money as xsmoney,time from".tablename('zhtc_storepaylog')." where uniacid={$_W['uniacid']} and money>0 and  time like '%{$gtime}%' union all select money as xsmoney,time from".tablename('zhtc_tzpaylog')." where uniacid={$_W['uniacid']} and money>0 and  time like '%{$gtime}%' union all select money as xsmoney,time from".tablename('zhtc_carpaylog')." where uniacid={$_W['uniacid']} and money>0 and  time like '%{$gtime}%' union all select money  as xsmoney,time from".tablename('zhtc_yellowpaylog')." where uniacid={$_W['uniacid']} and money>0 and  time like '%{$gtime}%') aa ");



$select_sql =$sql." LIMIT " .($pageindex - 1) * $pagesize.",".$pagesize;

$xsinfo=pdo_fetchall($select_sql);
$pager = pagination($total, $pageindex, $pagesize);


include $this->template('web/xsdata');