<?php include 'header.php'; ?>

<!-- page header part start here -->
<section class="pageBanner">
    <article class="container">
        <aside class="row">
            <div class="col-md-6">
                <h4>Lessons & Courses</h4>
            </div>
            <div class="col-md-6">
                <ul class="navList">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="javascript:void(0)">Category</a></li>
                    <li class="active">Lessons & Courses</li>
                </ul>
            </div>
        </aside>
    </article>
</section>
<!-- page header part end here -->

<!-- page body part start -->
<section class="midBody">
    <article class="container-fluid">
        <article class="row">
            <!-- ad box start -->
            <div class="col-md-1 adBx">
                <div class="sticky-top">
                    <img src="assets/images/Ad.jpg" alt="" />
                </div>
            </div>
            <!-- ad box end -->

            <!-- left part start -->
            <div class="col-md-3">
                <nav class="navbar navbar-expand-lg bg-body-tertiary sideBarNav">
                    <div class="titelBx">
                        <a class="navbar-brand" href="#sideBarCollapse" data-bs-toggle="collapse" aria-controls="sideBarCollapse">Short By Filter</a>
                        <i class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sideBarCollapse" aria-controls="sideBarCollapse">
                            <span class="fa fa-chevron-down"></span>
                        </i>
                    </div>
                    <div class="collapse navbar-collapse" id="sideBarCollapse">
                        <div class="customeSidebar">
                            <div class="listBx">
                                <form class="input-group pt-1 pb-1">
                                    <input type="text" class="form-control" placeholder="Search...">
                                    <button class="btn btn-warning" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
                                </form>
                            </div>

                            <div class="headBx dropHeadBx"><a class="collapseLink" data-bs-toggle="collapse" href="#marketing">Marketing <i class="fa fa-chevron-circle-down pull-right mt3"></i></a></div>
                            <div class="listBx p0 collapse" id="marketing">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Automation
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Contact Management
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Email Marketing
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Inbound Marketing
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Lead Generation
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Reporting & Performance
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Search Engine Optimization
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Social Media
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Web Design
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx dropHeadBx"><a class="collapseLink" data-bs-toggle="collapse" href="#sales">Sales <i class="fa fa-chevron-circle-down pull-right mt3"></i></a></div>
                            <div class="listBx p0 collapse" id="sales">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Contact Management
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Inbound Sales
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Sales Enablement
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx dropHeadBx"><a class="collapseLink" data-bs-toggle="collapse" href="#service">Service <i class="fa fa-chevron-circle-down pull-right mt3"></i></a></div>
                            <div class="listBx p0 collapse" id="service">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Contact Management
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Inbound Service
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <div class="headBx">Content Type</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Course
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Lesson
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Ebook
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div class="headBx">Duration</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 30 min or less
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 30 min - 1 Hour
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 1 - 2 Hours
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 2 - 3 Hours
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> 3+ Hours
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div class="headBx">Levels</div>
                            <div class="listBx p0">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Beginner
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Intermediate
                                        </label>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value=""> Advanced
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <!-- left part end -->

            <!-- right part start -->
            <div class="col-md-7">
                <div class="row">
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="lCItem">
                            <div class="shadow3"></div>
                            <div class="shadow2"></div>
                            <div class="shadow1"></div>
                            <div class="innerBx">
                                <div class="titelBx">
                                    <i class="fa fa-lightbulb-o"></i>
                                    <h4>Developing Scalable HubSpot Solutions</h4>
                                </div>
                                <div class="textCont">
                                    <h5 class="mb-1 text16"><b>SHORT COURSE</b></h5>
                                    <h6 class="mb-3 text14">5 Lessons <span class="theme-text">3:00 hours</span></h6>
                                    <p>In this course, you'll build the foundational skills needed to create scala...</p>
                                    <a class="btn btnTheme width100" href="lessons-courses-details.php">Start course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="lCItem">
                            <div class="shadow3"></div>
                            <div class="shadow2"></div>
                            <div class="shadow1"></div>
                            <div class="innerBx">
                                <div class="titelBx">
                                    <i class="fa fa-lightbulb-o"></i>
                                    <h4>Developing Scalable HubSpot Solutions</h4>
                                </div>
                                <div class="textCont">
                                    <h5 class="mb-1 text16"><b>SHORT COURSE</b></h5>
                                    <h6 class="mb-3 text14">5 Lessons <span class="theme-text">3:00 hours</span></h6>
                                    <p>In this course, you'll build the foundational skills needed to create scala...</p>
                                    <a class="btn btnTheme width100" href="lessons-courses-details.php">Start course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="lCItem">
                            <div class="shadow3"></div>
                            <div class="shadow2"></div>
                            <div class="shadow1"></div>
                            <div class="innerBx">
                                <div class="titelBx">
                                    <i class="fa fa-lightbulb-o"></i>
                                    <h4>Developing Scalable HubSpot Solutions</h4>
                                </div>
                                <div class="textCont">
                                    <h5 class="mb-1 text16"><b>SHORT COURSE</b></h5>
                                    <h6 class="mb-3 text14">5 Lessons <span class="theme-text">3:00 hours</span></h6>
                                    <p>In this course, you'll build the foundational skills needed to create scala...</p>
                                    <a class="btn btnTheme width100" href="lessons-courses-details.php">Start course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="lCItem">
                            <div class="shadow3"></div>
                            <div class="shadow2"></div>
                            <div class="shadow1"></div>
                            <div class="innerBx">
                                <div class="titelBx">
                                    <i class="fa fa-lightbulb-o"></i>
                                    <h4>Developing Scalable HubSpot Solutions</h4>
                                </div>
                                <div class="textCont">
                                    <h5 class="mb-1 text16"><b>SHORT COURSE</b></h5>
                                    <h6 class="mb-3 text14">5 Lessons <span class="theme-text">3:00 hours</span></h6>
                                    <p>In this course, you'll build the foundational skills needed to create scala...</p>
                                    <a class="btn btnTheme width100" href="lessons-courses-details.php">Start course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="lCItem">
                            <div class="shadow3"></div>
                            <div class="shadow2"></div>
                            <div class="shadow1"></div>
                            <div class="innerBx">
                                <div class="titelBx">
                                    <i class="fa fa-lightbulb-o"></i>
                                    <h4>Developing Scalable HubSpot Solutions</h4>
                                </div>
                                <div class="textCont">
                                    <h5 class="mb-1 text16"><b>SHORT COURSE</b></h5>
                                    <h6 class="mb-3 text14">5 Lessons <span class="theme-text">3:00 hours</span></h6>
                                    <p>In this course, you'll build the foundational skills needed to create scala...</p>
                                    <a class="btn btnTheme width100" href="lessons-courses-details.php">Start course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="lCItem">
                            <div class="shadow3"></div>
                            <div class="shadow2"></div>
                            <div class="shadow1"></div>
                            <div class="innerBx">
                                <div class="titelBx">
                                    <i class="fa fa-lightbulb-o"></i>
                                    <h4>Developing Scalable HubSpot Solutions</h4>
                                </div>
                                <div class="textCont">
                                    <h5 class="mb-1 text16"><b>SHORT COURSE</b></h5>
                                    <h6 class="mb-3 text14">5 Lessons <span class="theme-text">3:00 hours</span></h6>
                                    <p>In this course, you'll build the foundational skills needed to create scala...</p>
                                    <a class="btn btnTheme width100" href="lessons-courses-details.php">Start course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="lCItem">
                            <div class="shadow3"></div>
                            <div class="shadow2"></div>
                            <div class="shadow1"></div>
                            <div class="innerBx">
                                <div class="titelBx">
                                    <i class="fa fa-lightbulb-o"></i>
                                    <h4>Developing Scalable HubSpot Solutions</h4>
                                </div>
                                <div class="textCont">
                                    <h5 class="mb-1 text16"><b>SHORT COURSE</b></h5>
                                    <h6 class="mb-3 text14">5 Lessons <span class="theme-text">3:00 hours</span></h6>
                                    <p>In this course, you'll build the foundational skills needed to create scala...</p>
                                    <a class="btn btnTheme width100" href="lessons-courses-details.php">Start course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="lCItem">
                            <div class="shadow3"></div>
                            <div class="shadow2"></div>
                            <div class="shadow1"></div>
                            <div class="innerBx">
                                <div class="titelBx">
                                    <i class="fa fa-lightbulb-o"></i>
                                    <h4>Developing Scalable HubSpot Solutions</h4>
                                </div>
                                <div class="textCont">
                                    <h5 class="mb-1 text16"><b>SHORT COURSE</b></h5>
                                    <h6 class="mb-3 text14">5 Lessons <span class="theme-text">3:00 hours</span></h6>
                                    <p>In this course, you'll build the foundational skills needed to create scala...</p>
                                    <a class="btn btnTheme width100" href="lessons-courses-details.php">Start course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="lCItem">
                            <div class="shadow3"></div>
                            <div class="shadow2"></div>
                            <div class="shadow1"></div>
                            <div class="innerBx">
                                <div class="titelBx">
                                    <i class="fa fa-lightbulb-o"></i>
                                    <h4>Developing Scalable HubSpot Solutions</h4>
                                </div>
                                <div class="textCont">
                                    <h5 class="mb-1 text16"><b>SHORT COURSE</b></h5>
                                    <h6 class="mb-3 text14">5 Lessons <span class="theme-text">3:00 hours</span></h6>
                                    <p>In this course, you'll build the foundational skills needed to create scala...</p>
                                    <a class="btn btnTheme width100" href="lessons-courses-details.php">Start course</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                </div>
                <!-- pagination start here -->
                <div align="center">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination d-inline-flex">
                            <li class="page-item"><a class="page-link" href="#.">Previous</a></li>
                            <li class="page-item active"><a class="page-link" href="#.">1</a></li>
                            <li class="page-item"><a class="page-link" href="#.">2</a></li>
                            <li class="page-item"><a class="page-link" href="#.">3</a></li>
                            <li class="page-item"><a class="page-link" href="#.">Next</a></li>
                        </ul>
                    </nav>
                </div>
                <!-- pagination end here -->
            </div>
            <!-- right part end -->

            <!-- ad box start -->
            <div class="col-md-1 adBx">
                <div class="sticky-top">
                    <img src="assets/images/Ad.jpg" alt="" />
                </div>
            </div>
            <!-- ad box end -->
        </article>
    </article>
</section>
<!-- page body part end -->

<?php include 'footer.php'; ?>