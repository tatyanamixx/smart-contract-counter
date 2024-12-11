import { toNano } from '@ton/core';
import { ProjectContract } from '../wrappers/ProjectContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const projectContract = provider.open(await ProjectContract.fromInit());

    await projectContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(projectContract.address);

    // run methods on `projectContract`
}
