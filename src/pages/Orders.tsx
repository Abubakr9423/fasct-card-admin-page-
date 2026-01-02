import { useProfileStore } from "@/store/store";
import { Pencil, Trash } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";

const Orders = () => {
  const { data, fetchPrfile, deleteprofile, getrole, data1 } = useProfileStore(
    (state) => state
  );

  useEffect(() => {
    fetchPrfile();
    getrole()
  }, []);

  console.log(data1);


  const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
    initialValues: {
      image: "",
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Dob: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const formdata = new FormData();
      formdata.append("FirstName", values.FirstName);
      formdata.append("LastName", values.LastName);
      formdata.append("Email", values.Email);
      formdata.append("PhoneNumber", values.PhoneNumber);
      formdata.append("Dob", values.Dob);
      formdata.append("image", values.image);
      console.log("Submitting:", Object.fromEntries(formdata));
    },
  });




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
                    onClick={() => deleteprofile(e.userId)}
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
                        <Pencil />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                      <form onSubmit={handleSubmit}>
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              name="FirstName"
                              value={values.FirstName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              name="LastName"
                              value={values.LastName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="Email"
                              value={values.Email}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="PhoneNumber"
                              value={values.PhoneNumber}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                              id="dob"
                              name="Dob"
                              value={values.Dob}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="image">Profile Image</Label>
                            <Input
                              id="image"
                              name="image"
                              type="file"
                              accept="image/*"
                              onChange={(event) => {
                                const file = event.currentTarget.files?.[0];
                                setFieldValue("image", file);
                              }}
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </form>
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