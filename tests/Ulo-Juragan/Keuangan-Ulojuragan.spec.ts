import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function Login( page : Page, login : any){
    await page.goto(`${process.env.TEST_URL}/beranda`, { timeout: 20000 });
    await page.getByPlaceholder('Contoh: ulo@gmail.com').fill(login.email);
    await page.getByPlaceholder('Minimal 8 karakter').fill(login.password);
    await page.getByPlaceholder('Minimal 8 karakter').press('Enter');
    await expect(page).toHaveURL(`${process.env.TEST_URL}/beranda`, { timeout: 20000 }); 

}

async function Aturpengeluaran(page : Page, aturpengeluaran : any){
    if ( await page.getByRole('link', { name: 'Atur Pengeluaran' }).isVisible()) {

        await page.getByRole('link', { name: 'Atur Pengeluaran' }).click();

      } else {
        await page.getByRole('button', { name: 'Keuangan' }).click();
    }

    await page.getByRole('link', { name: 'Atur Pengeluaran' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/keuangan/atur-pengeluaran`, { timeout: 20000 }); 
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByPlaceholder('300.000').click();
    await page.getByPlaceholder('300.000').fill(aturpengeluaran.nominalpengeluaran);
    await page.getByPlaceholder('Contoh: Bayar listrik').click();
    await page.getByPlaceholder('Contoh: Bayar listrik').fill(aturpengeluaran.keterangan);
    await page.getByRole('button', { name: 'Simpan' }).click();

    const successMessage = page.locator('.swal2-success-ring', );
    await expect(successMessage).toBeVisible();
}

async function Laporanlabarugi(page : Page){
    if ( await page.getByRole('link', { name: 'Atur Pengeluaran' }).isVisible()) {

        await page.getByRole('link', { name: 'Atur Pengeluaran' }).click();

      } else {
        await page.getByRole('button', { name: 'Keuangan' }).click();
    }

    await page.getByRole('link', { name: 'Laporan Laba Rugi' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/keuangan/laporan-laba-rugi`, { timeout: 20000 }); 

    await page.getByText('Hari ini').click();
    await page.getByRole('option', { name: 'Minggu Terakhir' }).click();
    await page.getByTestId('ArrowDropDownIcon').nth(2).click();
}

async function Statistiklabarugi(page : Page) {
    if ( await page.getByRole('link', { name: 'Statistik Laba Rugi' }).isVisible()) {

        await page.getByRole('link', { name: 'Statistik Laba Rugi' }).click();
    } else {
        await page.getByRole('button', { name: 'Keuangan' }).click();
    }
    
    await page.getByRole('link', { name: 'Statistik Laba Rugi' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/keuangan/statistik-laba-rugi`, { timeout: 20000 });
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

test('Atur Pengeluaran-tambahpengeluaran', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
    const aturpengeluaran = {
        // isi keterangan tambah pengeluaran
        nominalpengeluaran : '1200',
        keterangan : 'Keterangan',
    }
    await Login (page, login);
    await Aturpengeluaran (page, aturpengeluaran);
})

test('Laporan Laba Rugi-check', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
    await Login (page, login);
    await Laporanlabarugi (page);

})

test('Statistik Laba Rugi-check', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }

    await Login (page, login); 
    await Statistiklabarugi (page);
})