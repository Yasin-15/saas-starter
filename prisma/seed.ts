import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@example.com'
    const password = await bcrypt.hash('password123', 10)

    // 1. Create User
    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Admin User',
            password,
            image: 'https://ui-avatars.com/api/?name=Admin+User',
            emailVerified: new Date(),
        },
    })

    // 2. Create Tenant
    const tenant = await prisma.tenant.upsert({
        where: { slug: 'admin-org' },
        update: {},
        create: {
            name: 'Admin Organization',
            slug: 'admin-org',
        },
    })

    // 3. Link User to Tenant as Owner
    await prisma.tenantUser.upsert({
        where: {
            tenantId_userId: {
                tenantId: tenant.id,
                userId: user.id,
            },
        },
        update: {},
        create: {
            tenantId: tenant.id,
            userId: user.id,
            role: Role.OWNER,
        },
    })

    console.log('✅ Admin seed completed!')
    console.log(`👤 User: ${user.email}`)
    console.log(`🏢 Tenant: ${tenant.name} (${tenant.slug})`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
