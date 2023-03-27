import { Address } from './address';
import { Admin } from './admin';
import { Company } from './company';
import { PasswordResetRequest } from './passwordResetRequest';

describe('Password reset request', () => {
    it('should be able to create a password reset request', () => {
        const passwordResetRequest = new PasswordResetRequest({
            status: 1,
            admin: new Admin({
                name: 'Leonardo Faria',
                user: 'Mdpobsep Gbsjb',
                password: '1234567',
            }),
            company: new Company({
                email: 'contato@cyberswitch.dev',
                password: 'melaoazul',
                cnpj: '556750940',
                comporateName: 'Cyberswitch-Ltda',
                popularName: 'CyberSwitch',
                phoneNumber: '14998867061',
                address: new Address(
                'Brasil',
                'São Paulo',
                'Ourinhos',
                'Ouro Verde',
                'Mario Toloto',
                '318',
                ),
            })
        });
    })
})
