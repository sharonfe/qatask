import { Page } from "@playwright/test";

export class LoginPage {
    
readonly page: Page;

constructor(page: Page) {
    this.page = page;

  }

async neviagteTo(url:string) {
    console.log("about to goto:", url);
    await this.page.goto(url);
    await this.page.waitForLoadState();
} 

  async enterEmail(email: string) {
    await this.page.locator("#email").fill(email);
    console.log(`enter userId: ${email}`);
  }

  async enterPassword(password: string) {
    await this.page.locator("#password").fill(password);
  }
 

  async clickSignButton(isEnable=false) {
    if(isEnable){
       const isenable= await this.page.locator("button",{hasText:'Sign In'}).isEnabled()
       return isenable
    }
     await this.page.locator("button",{hasText:'Sign In'}).click();
  }
  async IsLoaded() {
   await this.page.waitForURL('https://dashboard.stg.sensi.ai/dashboard') 
  const isLoaded= await this.page.locator('[data-testid="MenuIcon"]').isVisible()
  return isLoaded
  }

  async getwarnningmessage(type:'email'|'password') {
switch (type) {
    case 'email':
        const emailMessage=await this.page.locator('#email-helper-text').innerText()
        return emailMessage
        break;
    case 'password':
        const passwordMessage=await this.page.locator('.relative .MuiBox-root div').innerText()
        return passwordMessage   
        
    default:
        break;
}
  }
   async forgatPassword() {
       await  this.page.getByText('Forgot password?',{'exact':true}).click()
        const pass =await this.page.locator('.login-form-header h3').innerText()
        return pass;
   }
      
   
   
    
  
} 