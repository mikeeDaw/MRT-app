import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Middleware } from "../../middleware/Middleware";
const Navibar = () => {
  const { logout } = Middleware();

  return (
    <Navbar className="bg-[#202758]" fluid>
      <Navbar.Brand href="#">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          MRT Ticketing
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
          className="z-50"
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              logout();
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Navibar;
