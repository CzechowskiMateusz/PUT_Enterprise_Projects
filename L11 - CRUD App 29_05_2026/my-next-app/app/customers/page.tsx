import { customerService } from "@/lib/services/customer-service";
import NewCustomerForm from "./_components/new-customer-form";
import CustomersTable from "./_components/customers-table";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
    
const customers = await customerService.getAll();
     return (
        <>
        <NewCustomerForm />
        <p>&nbsp;</p>
        <CustomersTable />
        </>
 );
}
