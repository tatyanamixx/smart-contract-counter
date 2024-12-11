import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ProjectContract } from '../wrappers/ProjectContract';
import '@ton/test-utils';

describe('ProjectContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let projectContract: SandboxContract<ProjectContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        projectContract = blockchain.openContract(await ProjectContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await projectContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: projectContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and projectContract are ready to use
    });
});
