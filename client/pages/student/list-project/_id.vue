<template>
    <div>
        <notifications group="auth" style="margin-top:62px" />
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
            <li class="nav-item" v-for="(item, index) in listType" :key="index" >
                <a role="tab" class="nav-link show" id="tab-0" data-toggle="tab" href="#tab-content-0" aria-selected="false" @click="filterProject(item.idNumber)">
                    <span>{{item.projectTypeName}}</span>
                </a>
            </li>
            
            <li class="nav-item" @click="showFormAdd()">
                <a role="tab" class="nav-link show active" id="tab-2" data-toggle="tab" href="#tab-content-2" aria-selected="true">
                    <span>Thêm đề tài</span>
                </a>
            </li> 
        </ul>
        <div class="main-card mb-3 card" v-if="isShowFormAdd">
            <div class="card-body">
                <h5 class="card-title">Thêm đề tài mới</h5>
                
                <div class="position-relative row form-group">
                    <label for="examplePassword" class="col-sm-2 col-form-label">Tên đề tài</label>
                    <div class="col-sm-10">
                        <input name="text" placeholder="..."  class="form-control" v-model="projectName">
                    </div>
                </div>
                <div class="position-relative row form-group">
                    <label for="exampleSelect" class="col-sm-2 col-form-label">Loại đề tài</label>
                    <div class="col-sm-10">
                        <select class="form-control" @change="onChang()">
                            <option :value="idNumberProjectType">Loại đề tài</option>  
                            <option v-for="item in listType" 
                                :key="item.idNumber" 
                                :value="item.idNumber" 
                                :data-foo="item.projectTypeName"
                                :selected="idNumberProjectType"
                            >
                                {{item.projectTypeName}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="position-relative row form-group">
                    <label for="exampleText" class="col-sm-2 col-form-label">Mục tiêu đề tài</label>
                    <div class="col-sm-10">
                        <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="projectTarget" v-model="projectTarget"/>
                    </div>
                </div>
                <div class="position-relative row form-group">
                    <label for="exampleText" class="col-sm-2 col-form-label">Yêu cầu kiến thức</label>
                    <div class="col-sm-10">
                        <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="projectRequire" v-model="projectRequire"/>
                    </div>
                </div>
                <div class="position-relative row form-check">
                    <div class="col-sm-2 offset-sm-10">
                        <button class="btn btn-secondary" @click="cancelAdd()">Cancel</button>
                        <button class="btn btn-success" @click="addProject()">Submit</button>
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
                                    <th class="text-center">Chọn</th>
                                    <th class="text-center">Mã đề tài</th>
                                    <th>Tên đề</th>
                                    <th class="text-center">Loại đề tài</th>
                                    <th class="text-center">Xem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in listProject" :key="index" >
                                    <td class="text-center text-muted">
                                        <input type="checkbox">
                                    </td>
                                    <td class="text-center text-muted">{{item.projectCode}}</td>
                                    <td>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left flex2">
                                                    <div class="widget-heading">{{item.projectName | truncate(50)}}</div>
                                                    <div class="widget-subheading opacity-7">GV {{item.teacherName}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">{{item.projectTypeName}}</td>
                                    <td class="text-center">
                                        <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm" @click="showFormDetailProject(item)"><i class="pe-7s-look"></i></button>
                                    </td>
                                </tr>


                               
                            </tbody>
                        </table>
                    </div>
                    <div class="card-header">
                        <div class="btn-actions-pane-right">
                            <div role="group" class="btn-group-sm btn-group">
                                <button class="btn btn-success">Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-12 col-lg-12">
                <div class="main-card mb-3 card">
                    <div class="card-body"><h5 class="card-title">Small Scrollable Area</h5>
                        <div class="scroll-area-sm" style="height: 350px !important;">
                            <div class="scrollbar-container ps--active-y ps">
                                <div class="table-responsive">
                                    <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Chọn</th>
                                                <th class="text-center">Mã đề tài</th>
                                                <th>Tên đề</th>
                                                <th class="text-center">Loại đề tài</th>
                                                <th class="text-center">Xem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                        
                                            <tr v-for="(item, index) in listProject" :key="index" >
                                                <td class="text-center text-muted">
                                                    <input type="checkbox">
                                                </td>
                                                <td class="text-center text-muted">{{item.projectCode}}</td>
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left flex2">
                                                                <div class="widget-heading">{{item.projectName | truncate(50)}}</div>
                                                                <div class="widget-subheading opacity-7">GV {{item.teacherName}}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="text-center">{{item.projectTypeName}}</td>
                                                <td class="text-center">
                                                    <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm" @click="showFormDetailProject(item)"><i class="pe-7s-look"></i></button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td class="text-center text-muted">
                                                    <input type="checkbox">
                                                </td> 
                                                <td class="text-center text-muted">DA1.5</td> 
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left flex2">
                                                                <div class="widget-heading">Tìm hiểu thuật toán học máy và ứng dụng xây...</div> 
                                                                <div class="widget-subheading opacity-7">GV Trần Thanh Phước</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td> 
                                                <td class="text-center">BTL 3</td> 
                                                <td class="text-center">
                                                    <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm"><i class="pe-7s-look"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-center text-muted">
                                                    <input type="checkbox">
                                                </td> 
                                                <td class="text-center text-muted">DA1.5</td> 
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left flex2">
                                                                <div class="widget-heading">Tìm hiểu thuật toán học máy và ứng dụng xây...</div> 
                                                                <div class="widget-subheading opacity-7">GV Trần Thanh Phước</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td> 
                                                <td class="text-center">BTL 3</td> 
                                                <td class="text-center">
                                                    <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm"><i class="pe-7s-look"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-center text-muted">
                                                    <input type="checkbox">
                                                </td> 
                                                <td class="text-center text-muted">DA1.5</td> 
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left flex2">
                                                                <div class="widget-heading">Tìm hiểu thuật toán học máy và ứng dụng xây...</div> 
                                                                <div class="widget-subheading opacity-7">GV Trần Thanh Phước</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td> 
                                                <td class="text-center">BTL 3</td> 
                                                <td class="text-center">
                                                    <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm"><i class="pe-7s-look"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-center text-muted">
                                                    <input type="checkbox">
                                                </td> 
                                                <td class="text-center text-muted">DA1.5</td> 
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left flex2">
                                                                <div class="widget-heading">Tìm hiểu thuật toán học máy và ứng dụng xây...</div> 
                                                                <div class="widget-subheading opacity-7">GV Trần Thanh Phước</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td> 
                                                <td class="text-center">BTL 3</td> 
                                                <td class="text-center">
                                                    <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm"><i class="pe-7s-look"></i></button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-center text-muted">
                                                    <input type="checkbox">
                                                </td> 
                                                <td class="text-center text-muted">DA1.5</td> 
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left flex2">
                                                                <div class="widget-heading">Tìm hiểu thuật toán học máy và ứng dụng xây...</div> 
                                                                <div class="widget-subheading opacity-7">GV Trần Thanh Phước</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td> 
                                                <td class="text-center">BTL 3</td> 
                                                <td class="text-center">
                                                    <button type="button" id="PopoverCustomT-1" class="btn btn-primary btn-sm"><i class="pe-7s-look"></i></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="ps__rail-x" style="left: 0px; bottom: -452px;">
                                    <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                </div>
                                <div class="ps__rail-y" style="top: 452px; height: 200px; right: 0px;">
                                    <div class="ps__thumb-y" tabindex="0" style="top: 139px; height: 61px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-lg-12">
                <div class="card-hover-shadow-2x mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-database icon-gradient bg-malibu-beach"> </i>
                            <span>Danh sách đề</span>
                        </div>
                    </div>
                    <div class="scroll-area-lg">
                        <div class="scrollbar-container ps ps--active-y">
                            <div class="p-2">
                                <ul class="todo-list-wrapper list-group list-group-flush">
                                    <li class="list-group-item" v-for="(item, index) in listProject" :key="index">
                                        <div class="todo-indicator bg-warning"></div>
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-2">
                                                    <div class="custom-checkbox custom-control" style="padding-left: 0; padding-right: 1.5rem;">
                                                        <input type="checkbox" >
                                                    </div>
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="widget-heading">
                                                        <b>{{item.projectName | truncate(60)}}</b>
                                                    </div>
                                                    <div class="widget-subheading">GV: <i>{{item.teacherName}}</i></div>
                                                </div>
                                                <div class="widget-content-left" style="margin-left: 10px;">
                                                    <span class="widget-subheading">{{item.projectTypeName}}</span>
                                                </div>
                                                <div class="widget-content-right">
                                                    <!-- <div class="badge badge-danger ml-2">Rejected</div> -->
                                                    <div class="ml-2">
                                                        <button type="button" class="btn btn-primary btn-sm" @click="showFormDetailProject(item)"><i class="pe-7s-look"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
                            <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                        </div>
                        <div class="ps__rail-y" style="top: 0px; height: 400px; right: 0px;">
                            <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 232px;"></div>
                        </div>
                    </div>
                    </div>
                    <div class="d-block text-right card-footer">
                        <!-- <button class="mr-2 btn btn-link btn-sm">Cancel</button> -->
                        <button class="btn btn-success">Đăng ký</button>
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
        
        <modal name="FormDetailProject" width="auto" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Chi tiết</h5>
                            <button class="close" @click="closeFormDetailProject()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <b>Loại đề tài: </b> <span>{{project.projectTypeName}}</span>
                            </div>
                            <div>
                                <b>Tên đề tài: </b> <p style="text-align: center;">{{project.projectName}}</p>
                            </div>
                            <div>
                                <b>Giảng viên: </b> <span><i>{{project.teacherName}}</i></span>
                            </div>
                            <div>
                                <b>Mục tiêu đề tài: </b>
                                <div v-html=project.projectTarget></div>
                            </div>
                            <div>
                                <b>Yêu cầu kiến thức: </b>
                                <div v-html=project.projectRequire></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeFormDetailProject()">Close</button>
                            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                        </div>
                    </div>
                </div>
            </div>
            
        </modal>

        <modal name="FormUpdateProject" width="auto" height="auto" :scrollable="true">
            <div class="modal" style="display: block; padding-left: 0px; top:60px;">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Chi tiết</h5>
                            <button class="close" @click="closeFormUpdateProject()"> <span>×</span> </button>
                        </div>
                        <div class="modal-body" style="max-height: 450px; overflow-y: scroll;">
                            <div class="position-relative row form-group">
                                <label class="col-sm-2 col-form-label">Tên đề tài</label>
                                <div class="col-sm-10">
                                    <input name="text" placeholder="..."  class="form-control" v-model="projectName">
                                </div>
                            </div>
                            <div class="position-relative row form-group">
                                <label class="col-sm-2 col-form-label">Loại đề tài</label>
                                <div class="col-sm-10">
                                    <select class="form-control" @change="onChang()">
                                        <option :value="idNumberProjectType">Loại đề tài</option>  
                                        <option v-for="item in listType" 
                                            :key="item.idNumber" 
                                            :value="item.idNumber" 
                                            :data-foo="item.projectTypeName"
                                            :selected="idNumberProjectType"
                                        >
                                            {{item.projectTypeName}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="position-relative row form-group">
                                <label for="exampleText" class="col-sm-2 col-form-label">Mục tiêu đề tài</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" rows="6" v-model="projectTarget"></textarea>
                                    <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="projectTarget" v-model="projectTarget"/>
                                </div>
                            </div>
                            <div class="position-relative row form-group">
                                <label for="exampleText" class="col-sm-2 col-form-label">Yêu cầu kiến thức</label>
                                <div class="col-sm-10">
                                    <editor :html="editorHtml" mode="wysiwyg" :value="editorText" ref="projectRequire" v-model="projectRequire"/>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeFormUpdateProject()">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </modal>
    </div>
</template>
<script>
    import Vue from "vue"
	import axios from "axios"
	import Notifications from 'vue-notification'
	import Toaster from 'v-toaster'
    import 'v-toaster/dist/v-toaster.css'
    import 'tui-editor/dist/tui-editor.css';
    import 'tui-editor/dist/tui-editor-contents.css';
    import 'codemirror/lib/codemirror.css';
    import Editor from '@toast-ui/vue-editor/src/editor.vue'
    
    import VModal from 'vue-js-modal';
    Vue.use(VModal);    
    
    import VueTruncate from'vue-truncate-filter'
    Vue.use(VueTruncate)

	Vue.use(Toaster, {timeout: 10000})
	Vue.use(Notifications)
    var md5 = require('md5');
    
    export default {
        components: { 'editor': Editor },
        data(){
        	return{
                isShowFormAdd: false,
                listType:[],
                listProject:[],
                arrFillter:[],

                idNumberProjectType: 0, 
                projectTypeName: "", 
                projectName: "", 
                teacherCode: "", 
                projectTarget: "", 
                projectRequire: "",

                editorText: "",
                editorHtml: "",

                project:""
        	}
        },

        created() {
            this.getAllProjectType()
            this.getAllProject()
        },

        methods:{
            closeFormUpdateProject(){
                this.$modal.hide('FormUpdateProject')
            },

            showFormUpdateProject(){
                this.$modal.show('FormUpdateProject')
            },
            //////////////////////
            closeFormDetailProject(){
                this.$modal.hide('FormDetailProject')
            },

            showFormDetailProject(item){
                this.project = item
                this.$modal.show('FormDetailProject')
            },
            ////////////////////////////////
            filterProject(idNumber){ 
                if(!this.arrFillter || this.arrFillter.length == 0) return ""
                else return this.listProject = this.arrFillter.filter(item => item.idNumberProjectType == idNumber )
            },

            checkState(item){
                if(item.isRatify == "N") return "Đang chờ"
                else return "Đã duyệt"
            },
            cancelAdd(){
                this.isShowFormAdd = false
                this.emptyForm()
            },
            addProject() {
                this.projectTarget = this.$refs.projectTarget.invoke('getHtml')
                this.projectRequire = this.$refs.projectRequire.invoke('getHtml')
                
                if(this.projectTypeName == "" || this.projectName == "" || this.projectTarget == "" || this.projectRequire == ""){
                    return this.$notify({group: 'auth',title: 'Notice', text: "Điền đầy đủ thông tin !",type: 'warn'})
                } else {
                    axios.post(`${this.$store.state.apiLink}/project/add-project`, {
                        idNumberProjectType: this.idNumberProjectType, 
                        projectTypeName: this.projectTypeName, 
                        projectName: this.projectName, 
                        teacherCode: this.$store.state.userInfo.data.code, 
                        projectTarget: this.projectTarget, 
                        projectRequire: this.projectRequire,

                        "subjectCode": this.$route.params.id,
                        "token": localStorage.token || ""
                    })
                    .then(res => {
                        if(res.data.successes){
                            this.$notify({group: 'auth', title: 'Notice', text: 'Add projectstype success',type: 'success'});
                            this.isShowFormAdd = false
                            this.emptyForm()
                            this.getAllProjectType()
                            this.getAllProject()
                        } else {
                            this.$notify({group: 'auth',title: 'Notice', text: res.data.reason, type: 'warn'})
                        }
                    })
                }
            },
            
            onChang(){
                this.idNumberProjectType = Number(event.target.value)
                this.projectTypeName = event.target.options[event.target.options.selectedIndex].dataset.foo
            },

            emptyForm(){
                this.idNumberProjectType = 0, 
                this.projectTypeName = "" 
                this.projectName = ""
                this.teacherCode = ""
                this.projectTarget = "" 
                this.projectRequire = ""
            },
            
            showFormAdd(){
                this.isShowFormAdd = !this.isShowFormAdd
            },

            getAllProjectType() {
                
                axios.post(`${this.$store.state.apiLink}/projectstype/list-projectstype-by-subjectcode`,{
                    "subjectCode": this.$route.params.id,
                })
                .then(res => {
                    if(res.data.successes){
                        this.listType = res.data.data
                    } 
                })
                .catch(err => err);
            },

            getAllProject() {
                
                axios.post(`${this.$store.state.apiLink}/project/list-project-by-subjectcode`,{
                    "subjectCode": this.$route.params.id,
                })
                .then(res => {
                    if(res.data.successes){
                        this.listProject = res.data.data
                        this.arrFillter = res.data.data
                    } 
                })
                .catch(err => err);
            },
        }
    }
</script>