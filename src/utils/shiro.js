

export const shiroJurisdiction = ( Jurisdiction, html) => {
    let page = `<shiro:hasPermission name="${Jurisdiction}">
    ${html}
    </shiro:hasPermission>`
    return page
}


