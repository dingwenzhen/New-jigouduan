// 处理zip的
export const downloadZipFile=(res)=>{
    // const filename = decodeURIComponent(res.headers['content-disposition'].split('=')[1].replace(/["1"]/g,''));
    // const blod = new Blob([res.data],{type:'application/zip;application/octet-stream'});
    // const url = window.URL.createObjectURL(blod);
    const link = document.createElement('a')
    // link.download = filename;
    link.href = 'http://localhost:3000/api/review/Appear/inTheNewspapersLeadingOut?number=100&cjrq=20191225&jclc=20';
    link.style = 'display:none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(res)
}