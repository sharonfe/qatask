import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage';

let loginpage:LoginPage
test.beforeEach(
  async ({page}) => {
    loginpage= new LoginPage(page)
    await page.goto("https://dashboard.stg.sensi.ai/login");
    
  });
  test.afterEach(
    async ({page}) => {
    await page.close()
    });

test('Log in succefully with correct email & password', async ({  }) => {
   await loginpage.enterEmail('qa.test@sensi.ai')
   await loginpage.enterPassword('Qwerty10!@#')
   await loginpage.clickSignButton()
   const loaded =await loginpage.IsLoaded()
   expect(loaded).toBe(true)
 
  
});

test('validate wrong value in the email will display warning message', async ({ page }) => {
  await loginpage.enterEmail('qa')
  const message=await loginpage.getwarnningmessage('email')
  expect(message).toBeTruthy()
});

test('the sign in button will disable while on of the field has warning meassge', async ({ page }) => {
  await loginpage.enterEmail('qa')
const isenable = await loginpage.clickSignButton(true)
expect(isenable).toBe(true)
});
test('The Remember me for 30 days checkbox will check on defult ', async ({ page }) => {
 
const ischeck = await page.locator('#remember30Days').isChecked()
expect(ischeck).toBe(true)
});

test.only('The Forgot password link will redirect to forget password page', async ({ page }) => {
 
  const pass = await loginpage.forgatPassword()
  expect(pass).toBe('Forgot password?')
  });