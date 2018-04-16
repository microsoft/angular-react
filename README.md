# React support for Angular

Industry trends, organizational pressures, and other factors can lead to mandates regarding the use of component libraries or migration from one technology to another.  In the case of [Office UI Fabric][fab], where its use is required, the client must be written in React (there is no Angular component library for the latest version).  Rewrite from Angular to React may be cost-prohibitive or ill advised for other reasons.  

Use of Angular-React allows consuming any React elements, but specifically Office UI Fabric, within an Angular [2+] application.  The library of wrappers for Office UI Fabric simplifies the use of these components with Angular.  However, any React code can make use of the custom Angular-React renderer.
