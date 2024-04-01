<?php include 'header.php'; ?>

<!-- page header part start here -->
<section class="pageBanner">
    <article class="container">
        <aside class="row">
            <div class="col-md-6">
                <h4>My Account</h4>
            </div>
            <div class="col-md-6">
                <ul class="navList">
                    <li><a href="index.php">Home</a></li>
                    <li class="active">My Account</li>
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
            <div class="col-md-1 adBx sticky-top">
                <div class="sticky-top">
                    <img src="assets/images/Ad.jpg" alt="" />
                </div>
            </div>
            <!-- ad box end -->

            <!-- sidebar start -->
            <div class="col-md-3">
                <?php include 'my-account-sidebar.php'; ?>
            </div>
            <!-- sidebar end -->

            <!-- right part start -->
            <div class="col-md-7">
                <div class="card border-0">
                    <div class="card card-body border-0">
                        <h2 class="titleText">Personal Info</h2>
                        <div class="row">
                            <div class="col-md-9 mt-2">
                                <label class="mb-1"><b>Short Bio</b></label>
                                <textarea class="form-control" rows="3" placeholder="Write your bio here. It will be displayed on your public profile."></textarea>
                            </div>
                            <div class="col-md-3 mt-2">
                                <div class="fileBx">
                                    <input type="file" name="uploadfile" id="img" style="display:none;" />
                                    <label for="img">Click me to upload image</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card border-0 mt-4">
                    <div class="card card-body border-0 profileBx">
                        <!-- item start -->
                        <div class="item mb20">
                            <a class="nameTag collapsed" data-bs-toggle="collapse" href="#fullName">Full Name <i class="fa fa-pencil-square-o" title="Edit"></i>
                                <h5 class="mb5">Michael Fassbender</h5>
                            </a>
                            <div class="collapse" id="fullName">
                                <input type="text" class="form-control" value="Michael Fassbender" />
                            </div>
                        </div>
                        <!-- item end -->

                        <!-- item start -->
                        <div class="item mb20">
                            <a class="nameTag collapsed" data-bs-toggle="collapse" href="#emailId">Email ID <i class="fa fa-pencil-square-o" title="Edit"></i>
                                <h5 class="mb5">michaelfassbender@gmail.com</h5>
                            </a>
                            <div class="collapse" id="emailId">
                                <input type="email" class="form-control" value="michaelfassbender@gmail.com" />
                            </div>
                        </div>
                        <!-- item end -->

                        <!-- item start -->
                        <div class="item mb20">
                            <a class="nameTag collapsed" data-bs-toggle="collapse" href="#phoneNumber">Phone Number <i class="fa fa-pencil-square-o" title="Edit"></i>
                                <h5 class="mb5">+49 12345 67890</h5>
                            </a>
                            <div class="collapse" id="phoneNumber">
                                <input type="text" class="form-control" value="+49 12345 67890" />
                            </div>
                        </div>
                        <!-- item end -->

                        <!-- item start -->
                        <div class="item mb20">
                            <a class="nameTag collapsed" data-bs-toggle="collapse" href="#address">Address <i class="fa fa-pencil-square-o" title="Edit"></i>
                                <h5 class="mb5">Leipziger Str. 3-4, 10117 Berlin, Germany</h5>
                            </a>
                            <div class="collapse" id="address">
                                <input type="text" class="form-control" value="Leipziger Str. 3-4, 10117 Berlin, Germany" />
                            </div>
                        </div>
                        <!-- item end -->
                    </div>
                </div>
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