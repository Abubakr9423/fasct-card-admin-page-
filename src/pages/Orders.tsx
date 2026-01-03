import { Trash } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Formik, Form, Field } from "formik";
import { useProfileStore } from "@/store/store";

const Orders = () => {
  const { data, fetchProfile, deleteProfile, getRole, data1, addRole } =
    useProfileStore((state) => state);

  useEffect(() => {
    fetchProfile();
    getRole();
  }, []);

  return (
    <div className="p-6">
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">Image</th>
            <th className="px-6 py-3 text-left font-semibold">Name</th>
            <th className="px-6 py-3 text-left font-semibold">Role</th>
            <th className="px-6 py-3 text-left font-semibold">Gmail</th>
            <th className="px-6 py-3 text-left font-semibold">Phone</th>
            <th className="px-6 py-3 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((e, idx) => (
            <tr
              key={e.userId}
              className={`transition-colors duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-indigo-100`}
            >
              <td className="px-6 py-4 text-center">
                <img
                  className="w-[70px] h-[70px] rounded-full object-cover mx-auto transform transition-transform duration-300 hover:scale-110 hover:shadow-xl"
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt={e.userName}
                />
              </td>
              <td className="px-6 py-4 text-center font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200">
                {e.userName}
              </td>
              <td className="px-6 py-4 text-center text-gray-700">
                {e.userRoles.map((role) => (
                  <span
                    key={role.id}
                    className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mr-2 hover:bg-indigo-200 transition"
                  >
                    {role.name}
                  </span>
                ))}
              </td>
              <td className="px-6 py-4 text-center text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                {e.email || "—"}
              </td>
              <td className="px-6 py-4 text-center text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                {e.phoneNumber || "—"}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex gap-2 justify-center">
                  <Button
                    className="text-[#F04438]"
                    onClick={() => deleteProfile(e.userId)}
                    variant="outline"
                  >
                    <Trash />
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="text-[#1E5EFF]"
                        variant="outline"
                      >
                        Add Role
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                      <Formik
                        initialValues={{ roleId: "" }}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                          console.log(values);
                          
                          if (!values.roleId) {
                            alert("Please select a role");
                            setSubmitting(false);
                            return;
                          }
                          try {
                            // roleId comes from <option value={role.id}>
                            await addRole(e.userId,values.roleId);
                            resetForm();
                          } catch (error) {
                            console.error("Failed to add role:", error);
                          } finally {
                            setSubmitting(false);
                          }
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form className="flex flex-col gap-4">
                            <label htmlFor="roleId" className="text-sm font-medium">
                              Select Role
                            </label>

                            <Field as="select" name="roleId" className="border rounded p-2">
                              <option value="">-- Choose a role --</option>
                              {data1?.map((role) => (
                                <option key={role.id} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                            </Field>

                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-[#1E5EFF] text-white"
                            >
                              {isSubmitting ? "Adding..." : "Add Role"}
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </DialogContent>
                  </Dialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;