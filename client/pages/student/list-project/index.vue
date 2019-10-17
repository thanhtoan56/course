<template>
    <div>
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div class="page-title-icon">
                        <i class="pe-7s-car icon-gradient bg-mean-fruit">
                        </i>
                    </div>
                    <div>Analytics Dashboard
                        <div class="page-title-subheading">This is an example dashboard created using build-in elements and components.
                        </div>
                    </div>
                </div>
                <div class="page-title-actions">
                    <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" class="btn-shadow mr-3 btn btn-dark">
                        <i class="fa fa-star"></i>
                    </button>
                    <div class="d-inline-block dropdown">
                        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-shadow dropdown-toggle btn btn-info">
                            <span class="btn-icon-wrapper pr-2 opacity-7">
                                <i class="fa fa-business-time fa-w-20"></i>
                            </span>
                            Buttons
                        </button>
                        <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a href="javascript:void(0);" class="nav-link">
                                        <i class="nav-link-icon lnr-inbox"></i>
                                        <span>
                                            Inbox
                                        </span>
                                        <div class="ml-auto badge badge-pill badge-secondary">86</div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="javascript:void(0);" class="nav-link">
                                        <i class="nav-link-icon lnr-book"></i>
                                        <span>
                                            Book
                                        </span>
                                        <div class="ml-auto badge badge-pill badge-danger">5</div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="javascript:void(0);" class="nav-link">
                                        <i class="nav-link-icon lnr-picture"></i>
                                        <span>
                                            Picture
                                        </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a disabled href="javascript:void(0);" class="nav-link disabled">
                                        <i class="nav-link-icon lnr-file-empty"></i>
                                        <span>
                                            File Disabled
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>    </div>
        </div>            
        <ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
            <li class="nav-item">
                <a role="tab" class="nav-link show" id="tab-0" data-toggle="tab" href="#tab-content-0" aria-selected="false">
                    <span>Toastr Alerts</span>
                </a>
            </li>
            <li class="nav-item">
                <a role="tab" class="nav-link show active" id="tab-2" data-toggle="tab" href="#tab-content-2" aria-selected="true">
                    <span>Basic Alerts</span>
                </a>
            </li>
        </ul>
        <div class="row">
            <div class="col-sm-12 col-lg-12">
                <div class="card-hover-shadow-2x mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i class="header-icon lnr-database icon-gradient bg-malibu-beach"> </i>Tasks List</div>
                        <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                            <div class="btn-group dropdown">
                                <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-icon btn-icon-only btn btn-link"><i class="pe-7s-menu btn-icon-wrapper"></i></button>
                                <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link dropdown-menu"><h6 tabindex="-1" class="dropdown-header">Header</h6>
                                    <button type="button" tabindex="0" class="dropdown-item"><i class="dropdown-icon lnr-inbox"> </i><span>Menus</span></button>
                                    <button type="button" tabindex="0" class="dropdown-item"><i class="dropdown-icon lnr-file-empty"> </i><span>Settings</span></button>
                                    <button type="button" tabindex="0" class="dropdown-item"><i class="dropdown-icon lnr-book"> </i><span>Actions</span></button>
                                    <div tabindex="-1" class="dropdown-divider"></div>
                                    <div class="p-3 text-right">
                                        <button class="mr-2 btn-shadow btn-sm btn btn-link">View Details</button>
                                        <button class="mr-2 btn-shadow btn-sm btn btn-primary">Action</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="scroll-area-lg">
                        <div class="scrollbar-container ps ps--active-y">
                            <div class="p-2">
                                <ul class="todo-list-wrapper list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-warning"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox12" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox12">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">Wash the car
                                                        <div class="badge badge-danger ml-2">Rejected</div>
                                                    </div>
                                                    <div class="widget-subheading"><i>Written by Bob</i></div>
                                                </div>
                                                <div class="widget-content-right widget-content-actions">
                                                    <button class="border-0 btn-transition btn btn-outline-success">
                                                        <i class="fa fa-check"></i>
                                                    </button>
                                                    <button class="border-0 btn-transition btn btn-outline-danger">
                                                        <i class="fa fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-focus"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox1" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox1">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">Task with dropdown menu</div>
                                                    <div class="widget-subheading">
                                                        <div>By Johnny
                                                            <div class="badge badge-pill badge-info ml-2">NEW</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="widget-content-right widget-content-actions">
                                                    <div class="d-inline-block dropdown">
                                                        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="border-0 btn-transition btn btn-link">
                                                            <i class="fa fa-ellipsis-h"></i>
                                                        </button>
                                                        <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right"><h6 tabindex="-1" class="dropdown-header">Header</h6>
                                                            <button type="button" disabled="" tabindex="-1" class="disabled dropdown-item">Action</button>
                                                            <button type="button" tabindex="0" class="dropdown-item">Another Action</button>
                                                            <div tabindex="-1" class="dropdown-divider"></div>
                                                            <button type="button" tabindex="0" class="dropdown-item">Another Action</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-primary"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox4" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox4">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left flex2">
                                                    <div class="widget-heading">Badge on the right task</div>
                                                    <div class="widget-subheading">This task has show on hover actions!</div>
                                                </div>
                                                <div class="widget-content-right widget-content-actions">
                                                    <button class="border-0 btn-transition btn btn-outline-success">
                                                        <i class="fa fa-check"></i>
                                                    </button>
                                                </div>
                                                <div class="widget-content-right ml-3">
                                                    <div class="badge badge-pill badge-success">Latest Task</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-info"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox2" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox2">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left mr-3">
                                                    <div class="widget-content-left">
                                                        <img width="42" class="rounded" src="assets/images/avatars/1.jpg" alt="">
                                                    </div>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">Go grocery shopping</div>
                                                    <div class="widget-subheading">A short description for this todo item</div>
                                                </div>
                                                <div class="widget-content-right widget-content-actions">
                                                    <button class="border-0 btn-transition btn btn-outline-success">
                                                        <i class="fa fa-check"></i>
                                                    </button>
                                                    <button class="border-0 btn-transition btn btn-outline-danger">
                                                        <i class="fa fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-success"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox3" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox3">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left flex2">
                                                    <div class="widget-heading">Development Task</div>
                                                    <div class="widget-subheading">Finish React ToDo List App</div>
                                                </div>
                                                <div class="widget-content-right">
                                                    <div class="badge badge-warning mr-2">69</div>
                                                </div>
                                                <div class="widget-content-right">
                                                    <button class="border-0 btn-transition btn btn-outline-success">
                                                        <i class="fa fa-check"></i>
                                                    </button>
                                                    <button class="border-0 btn-transition btn btn-outline-danger">
                                                        <i class="fa fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-warning"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox12" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox12">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">Wash the car
                                                        <div class="badge badge-danger ml-2">Rejected</div>
                                                    </div>
                                                    <div class="widget-subheading"><i>Written by Bob</i></div>
                                                </div>
                                                <div class="widget-content-right widget-content-actions">
                                                    <button class="border-0 btn-transition btn btn-outline-success">
                                                        <i class="fa fa-check"></i>
                                                    </button>
                                                    <button class="border-0 btn-transition btn btn-outline-danger">
                                                        <i class="fa fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-focus"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox1" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox1">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">Task with dropdown menu</div>
                                                    <div class="widget-subheading">
                                                        <div>By Johnny
                                                            <div class="badge badge-pill badge-info ml-2">NEW</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="widget-content-right widget-content-actions">
                                                    <div class="d-inline-block dropdown">
                                                        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="border-0 btn-transition btn btn-link">
                                                            <i class="fa fa-ellipsis-h"></i>
                                                        </button>
                                                        <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right"><h6 tabindex="-1" class="dropdown-header">Header</h6>
                                                            <button type="button" disabled="" tabindex="-1" class="disabled dropdown-item">Action</button>
                                                            <button type="button" tabindex="0" class="dropdown-item">Another Action</button>
                                                            <div tabindex="-1" class="dropdown-divider"></div>
                                                            <button type="button" tabindex="0" class="dropdown-item">Another Action</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-primary"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox4" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox4">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left flex2">
                                                    <div class="widget-heading">Badge on the right task</div>
                                                    <div class="widget-subheading">This task has show on hover actions!</div>
                                                </div>
                                                <div class="widget-content-right widget-content-actions">
                                                    <button class="border-0 btn-transition btn btn-outline-success">
                                                        <i class="fa fa-check"></i>
                                                    </button>
                                                </div>
                                                <div class="widget-content-right ml-3">
                                                    <div class="badge badge-pill badge-success">Latest Task</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-info"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox2" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox2">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left mr-3">
                                                    <div class="widget-content-left">
                                                        <img width="42" class="rounded" src="assets/images/avatars/1.jpg" alt="">
                                                    </div>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">Go grocery shopping</div>
                                                    <div class="widget-subheading">A short description for this todo item</div>
                                                </div>
                                                <div class="widget-content-right widget-content-actions">
                                                    <button class="border-0 btn-transition btn btn-outline-success">
                                                        <i class="fa fa-check"></i>
                                                    </button>
                                                    <button class="border-0 btn-transition btn btn-outline-danger">
                                                        <i class="fa fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="todo-indicator bg-success"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox3" class="custom-control-input"><label class="custom-control-label" for="exampleCustomCheckbox3">&nbsp;</label>
                                                    </div>
                                                </div>
                                                <div class="widget-content-left flex2">
                                                    <div class="widget-heading">Development Task</div>
                                                    <div class="widget-subheading">Finish React ToDo List App</div>
                                                </div>
                                                <div class="widget-content-right">
                                                    <div class="badge badge-warning mr-2">69</div>
                                                </div>
                                                <div class="widget-content-right">
                                                    <button class="border-0 btn-transition btn btn-outline-success">
                                                        <i class="fa fa-check"></i>
                                                    </button>
                                                    <button class="border-0 btn-transition btn btn-outline-danger">
                                                        <i class="fa fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        <div class="ps__rail-x" style="left: 0px; bottom: 0px;"><div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps__rail-y" style="top: 0px; height: 400px; right: 0px;"><div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 232px;"></div></div></div>
                    </div>
                    <div class="d-block text-right card-footer">
                        <button class="mr-2 btn btn-link btn-sm">Cancel</button>
                        <button class="btn btn-primary">Add Task</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                                <div class="widget-heading">Total Orders</div>
                                <div class="widget-subheading">Last year expenses</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-success">1896</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                                <div class="widget-heading">Products Sold</div>
                                <div class="widget-subheading">Revenue streams</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-warning">$3M</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                                <div class="widget-heading">Followers</div>
                                <div class="widget-subheading">People Interested</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-danger">45,9%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-xl-none d-lg-block col-md-6 col-xl-4">
                <div class="card mb-3 widget-content">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                                <div class="widget-heading">Income</div>
                                <div class="widget-subheading">Expected totals</div>
                            </div>
                            <div class="widget-content-right">
                                <div class="widget-numbers text-focus">$147</div>
                            </div>
                        </div>
                        <div class="widget-progress-wrapper">
                            <div class="progress-bar-sm progress-bar-animated-alt progress">
                                <div class="progress-bar bg-info" role="progressbar" aria-valuenow="54" aria-valuemin="0" aria-valuemax="100" style="width: 54%;"></div>
                            </div>
                            <div class="progress-sub-label">
                                <div class="sub-label-left">Expenses</div>
                                <div class="sub-label-right">100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-header">Active Users
                        <div class="btn-actions-pane-right">
                            <div role="group" class="btn-group-sm btn-group">
                                <button class="active btn btn-focus">Last Week</button>
                                <button class="btn btn-focus">All Month</button>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th>Name</th>
                                <th class="text-center">City</th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-center text-muted">#345</td>
                                <td>
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <div class="widget-content-left">
                                                    <img width="40" class="rounded-circle" src="assets/images/avatars/4.jpg" alt="">
                                                </div>
                                            </div>
                                            <div class="widget-content-left flex2">
                                                <div class="widget-heading">John Doe</div>
                                                <div class="widget-subheading opacity-7">Web Developer</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">Madrid</td>
                                <td class="text-center">
                                    <div class="badge badge-warning">Pending</div>
                                </td>
                                <td class="text-center">
                                    <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm">Details</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center text-muted">#347</td>
                                <td>
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <div class="widget-content-left">
                                                    <img width="40" class="rounded-circle" src="assets/images/avatars/3.jpg" alt="">
                                                </div>
                                            </div>
                                            <div class="widget-content-left flex2">
                                                <div class="widget-heading">Ruben Tillman</div>
                                                <div class="widget-subheading opacity-7">Etiam sit amet orci eget</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">Berlin</td>
                                <td class="text-center">
                                    <div class="badge badge-success">Completed</div>
                                </td>
                                <td class="text-center">
                                    <button type="button" id="PopoverCustomT-2" class="btn btn-primary btn-sm">Details</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center text-muted">#321</td>
                                <td>
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <div class="widget-content-left">
                                                    <img width="40" class="rounded-circle" src="assets/images/avatars/2.jpg" alt="">
                                                </div>
                                            </div>
                                            <div class="widget-content-left flex2">
                                                <div class="widget-heading">Elliot Huber</div>
                                                <div class="widget-subheading opacity-7">Lorem ipsum dolor sic</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">London</td>
                                <td class="text-center">
                                    <div class="badge badge-danger">In Progress</div>
                                </td>
                                <td class="text-center">
                                    <button type="button" id="PopoverCustomT-3" class="btn btn-primary btn-sm">Details</button>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center text-muted">#55</td>
                                <td>
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <div class="widget-content-left">
                                                    <img width="40" class="rounded-circle" src="assets/images/avatars/1.jpg" alt=""></div>
                                            </div>
                                            <div class="widget-content-left flex2">
                                                <div class="widget-heading">Vinnie Wagstaff</div>
                                                <div class="widget-subheading opacity-7">UI Designer</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">Amsterdam</td>
                                <td class="text-center">
                                    <div class="badge badge-info">On Hold</div>
                                </td>
                                <td class="text-center">
                                    <button type="button" id="PopoverCustomT-4" class="btn btn-primary btn-sm">Details</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-block text-center card-footer">
                        <button class="mr-2 btn-icon btn-icon-only btn btn-outline-danger"><i class="pe-7s-trash btn-icon-wrapper"> </i></button>
                        <button class="btn-wide btn btn-success">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-3">
                <div class="card-shadow-danger mb-3 widget-chart widget-chart2 text-left card">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left pr-2 fsize-1">
                                    <div class="widget-numbers mt-0 fsize-3 text-danger">71%</div>
                                </div>
                                <div class="widget-content-right w-100">
                                    <div class="progress-bar-xs progress">
                                        <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100" style="width: 71%;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="widget-content-left fsize-1">
                                <div class="text-muted opacity-6">Income Target</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card-shadow-success mb-3 widget-chart widget-chart2 text-left card">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left pr-2 fsize-1">
                                    <div class="widget-numbers mt-0 fsize-3 text-success">54%</div>
                                </div>
                                <div class="widget-content-right w-100">
                                    <div class="progress-bar-xs progress">
                                        <div class="progress-bar bg-success" role="progressbar" aria-valuenow="54" aria-valuemin="0" aria-valuemax="100" style="width: 54%;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="widget-content-left fsize-1">
                                <div class="text-muted opacity-6">Expenses Target</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card-shadow-warning mb-3 widget-chart widget-chart2 text-left card">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left pr-2 fsize-1">
                                    <div class="widget-numbers mt-0 fsize-3 text-warning">32%</div>
                                </div>
                                <div class="widget-content-right w-100">
                                    <div class="progress-bar-xs progress">
                                        <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100" style="width: 32%;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="widget-content-left fsize-1">
                                <div class="text-muted opacity-6">Spendings Target</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card-shadow-info mb-3 widget-chart widget-chart2 text-left card">
                    <div class="widget-content">
                        <div class="widget-content-outer">
                            <div class="widget-content-wrapper">
                                <div class="widget-content-left pr-2 fsize-1">
                                    <div class="widget-numbers mt-0 fsize-3 text-info">89%</div>
                                </div>
                                <div class="widget-content-right w-100">
                                    <div class="progress-bar-xs progress">
                                        <div class="progress-bar bg-info" role="progressbar" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100" style="width: 89%;"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="widget-content-left fsize-1">
                                <div class="text-muted opacity-6">Totals Target</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SliderIndex from "~/components/client/slider";
    import Listcategories from "~/components/client/categories/list";
    import listProductIndex from "~/components/client/products/productIndex";
    import listAdSidebar from "~/components/client/listAdSidebar";
    import {mapGetters} from 'vuex';
    
    export default {
        components:{ SliderIndex, Listcategories, listProductIndex, listAdSidebar },
        created() { }
    }
</script>