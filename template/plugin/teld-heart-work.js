/*! builded Tue Jan 08 2019 13:46:46 */

onmessage=function(a){var b=a.data[0],c=a.data[1],d=a.data[2],e=a.data[3],f=a.data[4],g=a.data[5],h=a.data[6],i=a.data[7],j=h+"&userOnlineInfo="+JSON.stringify({BrowserType:g,clientType:e,addressComponent:b.addressComponent,formattedAddress:b.formattedAddress,position:b.position,pageName:d,application:c.isPlatformIndex?"\u9996\u9875":c.SubApplication,Ext1:i});oReq=new XMLHttpRequest,oReq.async=!0,oReq.open("POST",f+"WRPFrame-RecordUserOnline",!0),oReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),oReq.send(j)};