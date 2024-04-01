<?php include 'header.php'; ?>

<!-- page header part start here -->
<section class="pageBanner">
    <article class="container">
        <aside class="row">
            <div class="col-md-6">
                <h4>Contact Us</h4>
            </div>
            <div class="col-md-6">
                <ul class="navList">
                    <li><a href="index.php">Home</a></li>
                    <li class="active">Contact Us</li>
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

            <!--*************** Body part start ***************-->
            <div class="col-md-10">
                <!-- first part start -->
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="m0">Get in touch with us</h4>
                            </div>
                            <form class="card-body">
                                <div class="form-group mb-4">
                                    <input type="text" class="form-control" id="name" name="nm" placeholder="Name" required="" autofocus="">
                                </div>
                                <div class="form-group form_left mb-4">
                                    <input type="email" class="form-control" id="email" name="em" placeholder="Email" required="">
                                </div>
                                <div class="form-group mb-4">
                                    <input type="text" class="form-control" id="phone" maxlength="10" placeholder="Mobile No." required="">
                                </div>
                                <div class="form-group mb-4">
                                    <textarea class="form-control textarea-contact" rows="5" id="comment" name="FB" placeholder="Type Your Message/Feedback here..." required=""></textarea>
                                    <br>
                                    <button class="btn btnTheme" type="submit"> Submit Message <span class="fa fa-send"></span> </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5071.152286297458!2d7.677349994282403!3d50.542054854758454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be85ab5e065037%3A0x2116fb58113383e5!2s56269%20Dierdorf-Br%C3%BCckrachdorf%2C%20Germany!5e0!3m2!1sen!2sin!4v1702715002839!5m2!1sen!2sin" width="100%" height="480" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <!-- first part end -->

                <!-- information part start here -->
                <div class="row">
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="addIfoBx">
                            <div class="card mt-3">
                                <div class="card-body">
                                    <i class="fa fa-envelope mb-3"></i>
                                    <h5 class="card-title">Email Id</h5>
                                    <p class="card-text"><a href="mailto:support@dzital.de">support@dzital.de</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="addIfoBx">
                            <div class="card mt-3">
                                <div class="card-body">
                                    <i class="fa fa-phone mb-3"></i>
                                    <h5 class="card-title">Phone No.</h5>
                                    <p class="card-text"><a href="tel:03341816636">03341816636</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                    <!-- item start -->
                    <div class="col-md-4">
                        <div class="addIfoBx">
                            <div class="card mt-3">
                                <div class="card-body">
                                    <i class="fa fa-location-dot mb-3"></i>
                                    <h5 class="card-title">Office Address</h5>
                                    <p class="card-text">12345 Brückrachdorf Germany</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- item end -->
                </div>
                <!-- information part end here -->
            </div>
            <!--*************** Body part end ***************-->

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